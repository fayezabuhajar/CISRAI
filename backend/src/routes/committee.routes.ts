import { Router } from "express";
import { Committee } from "../models/Committee";
import { adminAuthMiddleware } from "../middleware/auth";
import { successResponse, errorResponse } from "../utils/response";
import { getPaginationMeta } from "../utils/pagination";
import { Request, Response } from "express";
import {
  createCommitteeValidator,
  updateCommitteeValidator,
  idValidator,
} from "../validators/index";
import { handleValidationErrors } from "../middleware/validationHandler";

const router = Router();

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
};

router.post(
  "/",
  adminAuthMiddleware,
  createCommitteeValidator(),
  handleValidationErrors,
  async (req: Request, res: Response) => {
    try {
      const committee = new Committee(req.body);
      await committee.save();
      res
        .status(201)
        .json(successResponse("Committee created", committee, 201));
    } catch (error: unknown) {
      res
        .status(400)
        .json(errorResponse("Creation failed", getErrorMessage(error), 400));
    }
  },
);

router.get("/", async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 1000;
    const skip = (page - 1) * limit;
    const committeeType = req.query.committee as string | undefined;

    const filter = committeeType ? { committee: committeeType } : {};

    const [committees, total] = await Promise.all([
      Committee.find(filter)
        .sort({ committee: 1, order: 1 })
        .skip(skip)
        .limit(limit),
      Committee.countDocuments(filter),
    ]);

    res.status(200).json(
      successResponse("Committees retrieved", {
        data: committees,
        meta: getPaginationMeta(total, page, limit),
      }),
    );
  } catch (error: unknown) {
    res
      .status(500)
      .json(
        errorResponse(
          "Error retrieving committees",
          getErrorMessage(error),
          500,
        ),
      );
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const committee = await Committee.findById(req.params.id);
    if (!committee) {
      return res
        .status(404)
        .json(errorResponse("Committee not found", "", 404));
    }
    res.status(200).json(successResponse("Committee retrieved", committee));
  } catch (error: unknown) {
    res
      .status(500)
      .json(
        errorResponse(
          "Error retrieving committee",
          getErrorMessage(error),
          500,
        ),
      );
  }
});

router.put(
  "/:id",
  adminAuthMiddleware,
  updateCommitteeValidator(),
  handleValidationErrors,
  async (req: Request, res: Response) => {
    try {
      const committee = await Committee.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        },
      );
      if (!committee) {
        return res
          .status(404)
          .json(errorResponse("Committee not found", "", 404));
      }
      res.status(200).json(successResponse("Committee updated", committee));
    } catch (error: unknown) {
      res
        .status(400)
        .json(errorResponse("Update failed", getErrorMessage(error), 400));
    }
  },
);

router.delete(
  "/:id",
  adminAuthMiddleware,
  async (req: Request, res: Response) => {
    try {
      const committee = await Committee.findByIdAndDelete(req.params.id);
      if (!committee) {
        return res
          .status(404)
          .json(errorResponse("Committee not found", "", 404));
      }
      res.status(200).json(successResponse("Committee deleted"));
    } catch (error: unknown) {
      res
        .status(400)
        .json(errorResponse("Deletion failed", getErrorMessage(error), 400));
    }
  },
);

export default router;
