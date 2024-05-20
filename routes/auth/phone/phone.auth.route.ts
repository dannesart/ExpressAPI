import { Utils } from "@/utils";
/**
 * Dependencies
 */
import express from "express";

/**
 * Model
 */
import Model from "./phone.auth.model";

/**
 * Controller
 */
import { PhoneAuthController } from "./phone.auth.controller";

const controller = new PhoneAuthController();

/**
 * Endpoints for Authorize user
 */
const router = express.Router();

router.post(
  Model.path,
  controller.handleApplicationSettings,
  controller.verifyApplication,
  controller.init
);

export default router;
