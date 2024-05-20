import { ErrorStatuses } from "@/vendor/errors";
/**
 * Dependencies
 */
import express from "express";
const router = express.Router();

/**
 * Model
 */
import Model from "./currencies.wallet.model";

/**
 * Controller
 */
import { GetCurrenciesController } from "./currencies.wallet.controller";
const controller = new GetCurrenciesController();

router.get(
  Model.path,
  controller.verifyUser,
  controller.getUserMiddleWare,
  controller.init
);

export default router;
