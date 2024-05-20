import { ErrorStatuses } from "@/vendor/errors";

/**
 * Dependencies
 */
import express from "express";

/**
 * Endpoints for user. Create, update, get, delete etc.
 */
const router = express.Router();

/**
 * Model
 */
import Model from "./history.transactions.model";

/**
 * Controller
 */
import { HistoryTransactionsController } from "./history.transactions.controller";
const controller = new HistoryTransactionsController();

router.get(
  Model.path,
  controller.verifyUser,
  controller.getUserMiddleWare,
  controller.init
);

export default router;
