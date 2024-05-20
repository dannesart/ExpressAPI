/**
 * Dependencies
 */
import express from "express";

/**
 * Model
 */
import Model from "./banks-countries.banks.model";

/**
 * Controller
 */
import { BanksCountriesWalletController } from "./banks-countries.banks.controller";

const router = express.Router();
const controller = new BanksCountriesWalletController();

router.get(Model.path, controller.verifyUser, controller.init);

export default router;
