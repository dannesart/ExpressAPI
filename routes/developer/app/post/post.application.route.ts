import { ErrorStatuses } from "@/vendor/errors";
/**
 * Dependencies
 */
import express from "express";

/**
 * Model
 */
import Model from "./post.application.model";

/**
 * Controller
 */
import { PostApplicationController } from "./post.application.controller";
const router = express.Router();
const controller = new PostApplicationController();

router.post(
  Model.path,
  controller.verifyUser,
  controller.verifyDeveloper,
  async (req, res) => {
    try {
      const applicationName = req.body.name;

      const developerId = res.locals.developer.id;

      if (!applicationName) {
        throw new Error("Missing name");
      }

      const newApplication = await controller.createApplication(
        developerId,
        applicationName
      );

      res.send({
        ...Model.responses[200],
        application: newApplication._doc,
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
