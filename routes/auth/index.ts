/**
 * Dependencies
 */
import bodyParser from "body-parser";
import express from "express";

/**
 * Endpoints for user. Create, update, get, delete etc.
 */

const router = express.Router();
router.use(bodyParser.json());

import { Route as PhoneRoute, Model as phoneAuthRequestModel } from "./phone";
import { Route as PhoneUiRoute, Model as phoneUiAuthRequestModel } from "./ui";
import {
  Route as PhoneValidateRoute,
  Model as phoneValidateAuthRequestModel,
} from "./phonevalidate";

router.use(PhoneRoute);
router.use(PhoneUiRoute);
router.use(PhoneValidateRoute);

export default router;
export { phoneAuthRequestModel, phoneValidateAuthRequestModel };

export const path = "/authorize";
