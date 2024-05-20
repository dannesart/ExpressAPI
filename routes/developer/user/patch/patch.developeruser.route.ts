import { ErrorStatuses } from "@/vendor/errors";
/**
 * Dependencies
 */
import express from "express";

/**
 * Model
 */
import Model from "./patch.developeruser.model";

/**
 * Controller
 */
import { PatchDeveloperUserController } from "./patch.developeruser.controller";
const router = express.Router();
const controller = new PatchDeveloperUserController();

router.patch(
  Model.path,
  controller.verifyUser,
  controller.verifyDeveloper,
  controller.init
);

export default router;
