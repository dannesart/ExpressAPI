/**
 * Dependencies
 */
import express from "express";
import swaggerUi from "swagger-ui-express";

/**
 * Routes
 */
import UserRoutes, {
  getUserRequestModel,
  KYCExtendedUserRequestModel,
  deleteUserRequestModel,
  KYCUserRequestModel,
  path as userPath,
} from "./users";

import AuthRoutes, {
  phoneAuthRequestModel,
  phoneValidateAuthRequestModel,
  path as authPath,
} from "./auth";

import WalletRoutes, {
  cashInRequestModel,
  cashOutRequestModel,
  getWalletRequestModel,
  getCurrenciesRequestModel,
  path as walletPath,
} from "./wallet";

import BankRoutes, {
  bankConsentRequestModel,
  banksRequestModel,
  banksCountriesModel,
  bankAuthConsentRequestModel,
  path as banksPath,
} from "./banks";

import TransactionRoutes, {
  postHoldRequestModel,
  getHoldsRequestModel,
  releaseHoldsRequestModel,
  historyRequestModel,
  transferRequestModel,
  path as transactionsPath,
} from "./transactions";

import DeveloperRoutes, { path as developerPath } from "./developer";

/**
 * Services
 */
import {
  toSwaggerOperation,
  swaggerVersion,
  swaggerFullVersion,
} from "@/utils";

/**
 * Swagger object. Created from all routes.
 */

const swaggerObject = {
  openapi: "3.0.0",
  info: {
    title: "Peyya API",
    version: swaggerFullVersion,
  },
  servers: [
    {
      url: `${process.env.APP_URL}/${swaggerVersion}`,
    },
  ],
  paths: {
    // User
    [userPath + getUserRequestModel.path]: {
      [getUserRequestModel.method.toLowerCase()]: toSwaggerOperation(
        getUserRequestModel,
        userPath
      ),
      [deleteUserRequestModel.method.toLowerCase()]: toSwaggerOperation(
        deleteUserRequestModel,
        userPath
      ),
    },
    [userPath + KYCExtendedUserRequestModel.path]: {
      [KYCExtendedUserRequestModel.method.toLowerCase()]: toSwaggerOperation(
        KYCExtendedUserRequestModel,
        userPath
      ),
    },
    [userPath + KYCUserRequestModel.path]: {
      [KYCUserRequestModel.method.toLowerCase()]: toSwaggerOperation(
        KYCUserRequestModel,
        userPath
      ),
    },
    // Auth
    [authPath + phoneAuthRequestModel.path]: {
      [phoneAuthRequestModel.method.toLowerCase()]: toSwaggerOperation(
        phoneAuthRequestModel,
        authPath
      ),
    },
    [authPath + phoneValidateAuthRequestModel.path]: {
      [phoneValidateAuthRequestModel.method.toLowerCase()]: toSwaggerOperation(
        phoneValidateAuthRequestModel,
        authPath
      ),
    },
    // Transactions
    [transactionsPath + postHoldRequestModel.path]: {
      [postHoldRequestModel.method.toLowerCase()]: toSwaggerOperation(
        postHoldRequestModel,
        transactionsPath
      ),
    },
    [transactionsPath + getHoldsRequestModel.path]: {
      [getHoldsRequestModel.method.toLowerCase()]: toSwaggerOperation(
        getHoldsRequestModel,
        transactionsPath
      ),
    },
    [transactionsPath + releaseHoldsRequestModel.path]: {
      [releaseHoldsRequestModel.method.toLowerCase()]: toSwaggerOperation(
        releaseHoldsRequestModel,
        transactionsPath
      ),
    },
    [transactionsPath + historyRequestModel.path]: {
      [historyRequestModel.method.toLowerCase()]: toSwaggerOperation(
        historyRequestModel,
        transactionsPath
      ),
    },
    [transactionsPath + transferRequestModel.path]: {
      [transferRequestModel.method.toLowerCase()]: toSwaggerOperation(
        transferRequestModel,
        transactionsPath
      ),
    },
    // Wallet
    [walletPath + getWalletRequestModel.path]: {
      [getWalletRequestModel.method.toLowerCase()]: toSwaggerOperation(
        getWalletRequestModel,
        walletPath
      ),
    },

    [walletPath + cashInRequestModel.path]: {
      [cashInRequestModel.method.toLowerCase()]: toSwaggerOperation(
        cashInRequestModel,
        walletPath
      ),
    },
    [walletPath + cashOutRequestModel.path]: {
      [cashOutRequestModel.method.toLowerCase()]: toSwaggerOperation(
        cashOutRequestModel,
        walletPath
      ),
    },
    [walletPath + getCurrenciesRequestModel.path]: {
      [getCurrenciesRequestModel.method.toLowerCase()]: toSwaggerOperation(
        getCurrenciesRequestModel,
        walletPath
      ),
    },
    // Banks
    [banksPath + bankConsentRequestModel.path]: {
      [bankConsentRequestModel.method.toLowerCase()]: toSwaggerOperation(
        bankConsentRequestModel,
        banksPath
      ),
    },
    [banksPath + banksRequestModel.path]: {
      [banksRequestModel.method.toLowerCase()]: toSwaggerOperation(
        banksRequestModel,
        banksPath
      ),
    },
    [banksPath + banksCountriesModel.path]: {
      [banksCountriesModel.method.toLowerCase()]: toSwaggerOperation(
        banksCountriesModel,
        banksPath
      ),
    },
    [banksPath + bankAuthConsentRequestModel.path]: {
      [bankAuthConsentRequestModel.method.toLowerCase()]: toSwaggerOperation(
        bankAuthConsentRequestModel,
        banksPath
      ),
    },
  },
};

/**
 * Endpoints
 */
const router = express.Router();

router.use(userPath, UserRoutes);
router.use(authPath, AuthRoutes);
router.use(walletPath, WalletRoutes);
router.use(banksPath, BankRoutes);
router.use(transactionsPath, TransactionRoutes);
router.use(developerPath, DeveloperRoutes);
router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerObject));

export default router;

export { swaggerObject, swaggerVersion };
