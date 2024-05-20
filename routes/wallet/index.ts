/**
 * Dependencies
 */
import express from "express";

import { Route as CashInRoute, Model as cashInRequestModel } from "./cashIn";

import { Route as CashOutRoute, Model as cashOutRequestModel } from "./cashOut";

import { Route as GetWalletRoute, Model as getWalletRequestModel } from "./get";

import {
  Route as GetCurrenciesRoute,
  Model as getCurrenciesRequestModel,
} from "./currencies";

/**
 * Endpoints for user. Create, update, get, delete etc.
 */
const router = express.Router();

router.use(CashInRoute);
router.use(CashOutRoute);
router.use(GetWalletRoute);
router.use(GetCurrenciesRoute);

export default router;

export {
  cashInRequestModel,
  cashOutRequestModel,
  getWalletRequestModel,
  getCurrenciesRequestModel,
};

export const path = "/wallet";
