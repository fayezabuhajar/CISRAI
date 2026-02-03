import { Router } from "express";
import { Committee } from "../models/Committee";
import { adminAuthMiddleware } from "../middleware/auth";
import { successResponse, errorResponse } from "../utils/response";
import { getPaginationMeta } from "../utils/pagination";
import { Request, Response } from "express";

const router = Router();

router.post("/", adminAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const committee = new Committee(req.body);
    await committee.save();
    res.status(201).json(successResponse("Committee created", committee, 201));
  } catch (error: any) {
    res.status(400).json(errorResponse("Creation failed", error.message, 400));
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const [committees, total] = await Promise.all([
      Committee.find().skip(skip).limit(limit).populate("members.userId"),
      Committee.countDocuments(),
    ]);

    res.status(200).json(
      successResponse("Committees retrieved", {
        data: committees,
        meta: getPaginationMeta(total, page, limit),
      }),
    );
  } catch (error: any) {
    res
      .status(500)
      .json(errorResponse("Error retrieving committees", error.message, 500));
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const committee = await Committee.findById(req.params.id).populate(
      "members.userId",
    );
    if (!committee) {
      return res
        .status(404)
        .json(errorResponse("Committee not found", "", 404));
    }
    res.status(200).json(successResponse("Committee retrieved", committee));
  } catch (error: any) {
    res
      .status(500)
      .json(errorResponse("Error retrieving committee", error.message, 500));
  }
});

router.put("/:id", adminAuthMiddleware, async (req: Request, res: Response) => {
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
  } catch (error: any) {
    res.status(400).json(errorResponse("Update failed", error.message, 400));
  }
});

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
    } catch (error: any) {
      res
        .status(400)
        .json(errorResponse("Deletion failed", error.message, 400));
    }
  },
);

export default router;
