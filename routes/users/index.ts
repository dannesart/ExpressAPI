/**
 * Dependencies
 */
import express from "express";

/**
 * Endpoints for user. Create, update, get, delete etc.
 */
const router = express.Router();

import { Route as GetUserRoute, Model as getUserRequestModel } from "./get";

import {
  Route as GetAllUserRoute,
  Model as getAllUserRequestModel,
} from "./list";

import {
  Route as DeleteUserRoute,
  Model as deleteUserRequestModel,
} from "./delete";

import { Route as KYCUserRoute, Model as KYCUserRequestModel } from "./kyc";
import {
  Route as KYCUrlUserRoute,
  Model as KYCUrlUserRequestModel,
} from "./kycByUrl";

import {
  Route as KYCExtendedUserRoute,
  Model as KYCExtendedUserRequestModel,
} from "./kycExtended";

router.use(GetUserRoute);
router.use(GetAllUserRoute);
router.use(DeleteUserRoute);
router.use(KYCExtendedUserRoute);
router.use(KYCUserRoute);
router.use(KYCUrlUserRoute);

export default router;
export {
  getUserRequestModel,
  deleteUserRequestModel,
  KYCExtendedUserRequestModel,
  getAllUserRequestModel,
  KYCUserRequestModel,
  KYCUrlUserRequestModel,
};

export const path = "/users";
