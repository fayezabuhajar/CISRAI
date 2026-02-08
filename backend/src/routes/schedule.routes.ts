import { Router } from "express";
import { Schedule } from "../models/Schedule";
import { createScheduleValidator } from "../validators/index";
import { handleValidationErrors } from "../middleware/validationHandler";
import { adminAuthMiddleware } from "../middleware/auth";
import { successResponse, errorResponse } from "../utils/response";
import { getPaginationMeta } from "../utils/pagination";
import { Request, Response } from "express";

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
  createScheduleValidator(),
  handleValidationErrors,
  async (req: Request, res: Response) => {
    try {
      const schedule = new Schedule(req.body);
      await schedule.save();
      res.status(201).json(successResponse("Event scheduled", schedule, 201));
    } catch (error: unknown) {
      res
        .status(400)
        .json(errorResponse("Scheduling failed", getErrorMessage(error), 400));
    }
  },
);

router.get("/", async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const [schedules, total] = await Promise.all([
      Schedule.find().skip(skip).limit(limit).populate("speaker"),
      Schedule.countDocuments(),
    ]);

    res.status(200).json(
      successResponse("Schedule retrieved", {
        data: schedules,
        meta: getPaginationMeta(total, page, limit),
      }),
    );
  } catch (error: unknown) {
    res
      .status(500)
      .json(
        errorResponse("Error retrieving schedule", getErrorMessage(error), 500),
      );
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const event = await Schedule.findById(req.params.id).populate("speaker");
    if (!event) {
      return res.status(404).json(errorResponse("Event not found", "", 404));
    }
    res.status(200).json(successResponse("Event retrieved", event));
  } catch (error: unknown) {
    res
      .status(500)
      .json(
        errorResponse("Error retrieving event", getErrorMessage(error), 500),
      );
  }
});

router.put("/:id", adminAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const event = await Schedule.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!event) {
      return res.status(404).json(errorResponse("Event not found", null, 404));
    }
    res.status(200).json(successResponse("Event updated", event));
  } catch (error: unknown) {
    res
      .status(400)
      .json(errorResponse("Update failed", getErrorMessage(error), 400));
  }
});

router.delete(
  "/:id",
  adminAuthMiddleware,
  async (req: Request, res: Response) => {
    try {
      const event = await Schedule.findByIdAndDelete(req.params.id);
      if (!event) {
        return res
          .status(404)
          .json(errorResponse("Event not found", null, 404));
      }
      res.status(200).json(successResponse("Event deleted"));
    } catch (error: unknown) {
      res
        .status(400)
        .json(errorResponse("Deletion failed", getErrorMessage(error), 400));
    }
  },
);

export default router;
