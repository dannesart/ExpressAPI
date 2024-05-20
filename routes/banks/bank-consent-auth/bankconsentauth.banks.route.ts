import { ErrorStatuses } from "@/vendor/errors";

/**
 * Model
 */
import Model from "./bankconsentauth.banks.model";

/**
 * Controller
 */
import { BankAuthConsentController } from "./bankconsentauth.banks.controller";

/**
 * Dependencies
 */
import express from "express";
const router = express.Router();

const controller = new BankAuthConsentController();

router.post(Model.path, controller.verifyUser, controller.init);

export default router;
