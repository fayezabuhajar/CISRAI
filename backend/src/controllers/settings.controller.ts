import { Request, Response, NextFunction } from "express";
import { settingsService } from "../services/settings.service";

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
};

export const settingsController = {
  async getSettings(req: Request, res: Response, next: NextFunction) {
    try {
      const settings = await settingsService.getSettings();
      res.status(200).json({
        success: true,
        data: settings,
      });
    } catch (error) {
      next(error);
    }
  },

  async getVenue(req: Request, res: Response, next: NextFunction) {
    try {
      const venue = await settingsService.getVenue();
      res.status(200).json({
        success: true,
        data: venue,
      });
    } catch (error) {
      next(error);
    }
  },

  async updateVenue(req: Request, res: Response, next: NextFunction) {
    try {
      const venueData = req.body;
      const settings = await settingsService.updateVenue(venueData);
      res.status(200).json({
        success: true,
        message: "Venue settings updated successfully",
        data: settings.venue,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: getErrorMessage(error),
      });
    }
  },

  async getImportantDates(req: Request, res: Response, next: NextFunction) {
    try {
      const dates = await settingsService.getImportantDates();
      res.status(200).json({
        success: true,
        data: dates,
      });
    } catch (error) {
      next(error);
    }
  },

  async updateImportantDates(req: Request, res: Response, next: NextFunction) {
    try {
      const dates = req.body;
      const updatedDates = await settingsService.updateImportantDates(dates);
      res.status(200).json({
        success: true,
        message: "Important dates updated successfully",
        data: updatedDates,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: getErrorMessage(error),
      });
    }
  },

  async getPatronName(req: Request, res: Response, next: NextFunction) {
    try {
      const patronName = await settingsService.getPatronName();
      res.status(200).json({
        success: true,
        data: patronName,
      });
    } catch (error) {
      next(error);
    }
  },

  async updatePatronName(req: Request, res: Response, next: NextFunction) {
    try {
      const patronData = req.body;
      const updatedPatron = await settingsService.updatePatronName(patronData);
      res.status(200).json({
        success: true,
        message: "Patron name updated successfully",
        data: updatedPatron,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: getErrorMessage(error),
      });
    }
  },

  async getSponsors(req: Request, res: Response, next: NextFunction) {
    try {
      const sponsors = await settingsService.getSponsors();
      res.status(200).json({
        success: true,
        data: sponsors,
      });
    } catch (error) {
      next(error);
    }
  },

  async updateSponsors(req: Request, res: Response, next: NextFunction) {
    try {
      const sponsors = req.body;
      const updatedSponsors = await settingsService.updateSponsors(sponsors);
      res.status(200).json({
        success: true,
        message: "Sponsors updated successfully",
        data: updatedSponsors,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: getErrorMessage(error),
      });
    }
  },

  async getPaymentDeadline(req: Request, res: Response, next: NextFunction) {
    try {
      const paymentDeadline = await settingsService.getPaymentDeadline();
      res.status(200).json({
        success: true,
        data: paymentDeadline,
      });
    } catch (error) {
      next(error);
    }
  },

  async updatePaymentDeadline(req: Request, res: Response, next: NextFunction) {
    try {
      const paymentDeadlineData = req.body;
      const updatedPaymentDeadline =
        await settingsService.updatePaymentDeadline(paymentDeadlineData);
      res.status(200).json({
        success: true,
        message: "Payment deadline updated successfully",
        data: updatedPaymentDeadline,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: getErrorMessage(error),
      });
    }
  },
};
