import { Utils } from "@/utils";
/**
 * Dependencies
 */
import express from "express";

/**
 * Model
 */
import Model from "./phonevalidate.auth.model";

/**
 * Controller
 */
import { PhoneValidateAuthController } from "./phonevalidate.auth.controller";

/**
 * Endpoints for Authorize user
 */
const router = express.Router();
const controller = new PhoneValidateAuthController();

router.post(
  Model.path,
  controller.handleApplicationSettings,
  controller.verifyApplication,
  controller.init
);

export default router;
