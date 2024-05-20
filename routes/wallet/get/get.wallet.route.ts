import { ErrorStatuses } from "@/vendor/errors";
/**
 * Dependencies
 */
import express from "express";
const router = express.Router();

/**
 * Model
 */
import Model from "./get.wallet.model";

/**
 * Controller
 */
import { GetWalletController } from "./get.wallet.controller";
const controller = new GetWalletController();

router.get(
  Model.path,
  controller.verifyUser,
  controller.getUserMiddleWare,
  controller.init
);

export default router;
