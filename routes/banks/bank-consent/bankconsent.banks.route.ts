import { ErrorStatuses } from "@/vendor/errors";

/**
 * Model
 */
import Model from "./bankconsent.banks.model";

/**
 * Controller
 */
import { BankInitConsentController } from "./bankconsent.banks.controller";

/**
 * Dependencies
 */
import express from "express";
const router = express.Router();

const controller = new BankInitConsentController();

router.post(Model.path, controller.verifyUser, controller.init);

export default router;
