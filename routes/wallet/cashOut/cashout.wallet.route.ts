import { ErrorStatuses } from "@/vendor/errors";
/**
 * Dependencies
 */
import express from "express";
const router = express.Router();

/**
 * Model
 */
import Model from "./cashout.wallet.model";

/**
 * Controller
 */
import { CashOutWalletController } from "./cashout.wallet.controller";
const controller = new CashOutWalletController();

router.post(Model.path, controller.verifyUser, async (req, res) => {
  if (!req.body.amount) {
    return res.status(ErrorStatuses.badRequest).send({
      error: "Missing amount value",
      status: ErrorStatuses.badRequest,
      errorCode: "cpuma1",
    });
  }

  // Get wallet / iban number
  try {
    res.send({
      status: 200,
      message: "Not implemented yet",
    });
  } catch (error) {
    return res
      .status(ErrorStatuses.expectationFailed)
      .send(Model.responses[ErrorStatuses.expectationFailed]);
  }

  res.send(Model.responses[200]);
});

export default router;
