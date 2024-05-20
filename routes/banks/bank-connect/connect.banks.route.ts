import { ErrorStatuses } from "@/vendor/errors";

/**
 * Model
 */
import Model from "./connect.banks.model";

/**
 * Controller
 */
import { BankConnectController } from "./connect.banks.controller";

/**
 * Dependencies
 */
import express from "express";
const router = express.Router();

const controller = new BankConnectController();

router.post(Model.path, controller.verifyUser, controller.init);

export default router;
