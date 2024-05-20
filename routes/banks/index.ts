/**
 * Dependencies
 */
import express from "express";

import {
  Route as BankConsentRoute,
  Model as bankConsentRequestModel,
} from "./bank-consent";

import {
  Route as BankAuthConsentRoute,
  Model as bankAuthConsentRequestModel,
} from "./bank-consent-auth";

import {
  Route as BankAuthStatusConsentRoute,
  Model as bankAuthStatusConsentRequestModel,
} from "./bank-consent-auth-status";

import { Route as BanksRoute, Model as banksRequestModel } from "./banks";

import {
  Route as BanksCountriesRoute,
  Model as banksCountriesModel,
} from "./banks-countries";

/**
 * Endpoints for user. Create, update, get, delete etc.
 */
const router = express.Router();

router.use(BankConsentRoute);
router.use(BanksRoute);
router.use(BanksCountriesRoute);
router.use(BankAuthConsentRoute);
router.use(BankAuthStatusConsentRoute);

export default router;

export {
  bankConsentRequestModel,
  banksRequestModel,
  banksCountriesModel,
  bankAuthConsentRequestModel,
  bankAuthStatusConsentRequestModel,
};

export const path = "/banks";
