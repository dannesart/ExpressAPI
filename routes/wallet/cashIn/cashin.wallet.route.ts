import { ErrorStatuses } from "@/vendor/errors";
/**
 * Dependencies
 */
import express from "express";
const router = express.Router();

/**
 * Model
 */
import Model from "./cashin.wallet.model";

/**
 * Controller
 */
import { CashInWalletController } from "./cashin.wallet.controller";
const controller = new CashInWalletController();

/**
 * Services
 */

router.post(
  Model.path,
  controller.verifyUser,
  controller.getUserMiddleWare,
  controller.init
);

export default router;
