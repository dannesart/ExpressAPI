import { ErrorStatuses } from "@/vendor/errors";
/**
 * Dependencies
 */
import express from "express";

/**
 * Model
 */
import Model from "./patch.application.model";

/**
 * Controller
 */
import { PatchApplicationController } from "./patch.application.controller";
const router = express.Router();
const controller = new PatchApplicationController();

router.patch(
  Model.path,
  controller.verifyUser,
  controller.verifyDeveloper,
  async (req, res) => {
    try {
      const applicationId = req.query.applicationId as string;
      const developerId = res.locals.developer.id;
      const { sandbox, use_credentials } = req.body;

      if (!applicationId) {
        throw new Error("Missing applicationId");
      }

      const application = await controller.updateApplication(
        developerId,
        applicationId,
        { sandbox, use_credentials }
      );

      res.send({
        ...Model.responses[200],
        application,
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
