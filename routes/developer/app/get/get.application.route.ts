import { ApplicationId } from "./../../../../schema/developer/application";
import { ErrorStatuses } from "@/vendor/errors";
/**
 * Dependencies
 */
import express from "express";

/**
 * Model
 */
import Model from "./get.application.model";

/**
 * Controller
 */
import { GetApplicationController } from "./get.application.controller";
const router = express.Router();
const controller = new GetApplicationController();

router.get(
  Model.path,
  controller.verifyUser,
  controller.verifyDeveloper,
  controller.init
);

export default router;
