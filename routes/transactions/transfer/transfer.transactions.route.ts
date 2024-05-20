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
import Model from "./transfer.transactions.model";

/**
 * Controller
 */
import { TransferTransactionsController } from "./transfer.transactions.controller";
const controller = new TransferTransactionsController();

router.post(
  Model.path,
  controller.verifyUser,
  controller.getUserMiddleWare,
  controller.init
);

export default router;
