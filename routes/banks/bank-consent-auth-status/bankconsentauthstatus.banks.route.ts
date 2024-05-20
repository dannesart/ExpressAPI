/**
 * Model
 */
import Model from "./bankconsentauthstatus.banks.model";

/**
 * Controller
 */
import { BankAuthStatusConsentController } from "./bankconsentauthstatus.banks.controller";

/**
 * Dependencies
 */
import express from "express";
const router = express.Router();

const controller = new BankAuthStatusConsentController();

router.get(Model.path, controller.verifyUser, controller.init);

export default router;
