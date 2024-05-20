import { ErrorStatuses } from "@/vendor/errors";
/**
 * Dependencies
 */
import express from "express";

/**
 * Model
 */
import Model from "./banks.banks.model";

/**
 * Controller
 */
import { BanksWalletController } from "./banks.banks.controller";

const router = express.Router();
const controller = new BanksWalletController();

router.get(Model.path, controller.verifyUser, controller.init);

export default router;
