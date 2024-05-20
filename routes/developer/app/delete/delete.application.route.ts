import { ErrorStatuses } from "@/vendor/errors";
/**
 * Dependencies
 */
import express from "express";

/**
 * Model
 */
import Model from "./delete.application.model";

/**
 * Controller
 */
import { DeleteApplicationController } from "./delete.application.controller";
const router = express.Router();
const controller = new DeleteApplicationController();

router.delete(
  Model.path,
  controller.verifyUser,
  controller.verifyDeveloper,
  async (req, res) => {
    try {
      const applicationId = req.params.applicationId;

      const developerId = res.locals.developer.id;

      if (!applicationId) {
        throw new Error("Missing applicationId");
      }

      const newApplication = await controller.deleteApplication(
        developerId,
        applicationId
      );

      res.send({
        ...Model.responses[200],
        removedApplication: newApplication._doc,
      });
    } catch (error) {
      res.statusCode = 500;
      res.send({
        status: 500,
        error,
      });
    }
  }
);

export default router;
