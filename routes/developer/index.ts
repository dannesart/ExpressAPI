/**
 * Dependencies
 */
import express from "express";

import {
  Route as CreateDeveloperRoute,
  Model as createDeveloperRequestModel,
} from "./user/post";

import {
  Route as GetDeveloperRoute,
  Model as getDeveloperRequestModel,
} from "./user/get";

import {
  Route as PatchDeveloperRoute,
  Model as patchDeveloperRequestModel,
} from "./user/patch";

import {
  Route as PostApplicationRoute,
  Model as postApplicationRequestModel,
} from "./app/post";

import {
  Route as DeleteApplicationRoute,
  Model as deleteApplicationRequestModel,
} from "./app/delete";

import {
  Route as GetApplicationRoute,
  Model as getApplicationRequestModel,
} from "./app/get";

import {
  Route as PatchApplicationRoute,
  Model as patchApplicationRequestModel,
} from "./app/patch";

/**
 * Endpoints for user. Create, update, get, delete etc.
 */
const router = express.Router();

router.use(PostApplicationRoute);
router.use(DeleteApplicationRoute);
router.use(GetApplicationRoute);
router.use(PatchApplicationRoute);
router.use(CreateDeveloperRoute);
router.use(GetDeveloperRoute);
router.use(PatchDeveloperRoute);

export default router;

export {
  createDeveloperRequestModel,
  deleteApplicationRequestModel,
  getDeveloperRequestModel,
  patchDeveloperRequestModel,
  postApplicationRequestModel,
  getApplicationRequestModel,
  patchApplicationRequestModel,
};

export const path = "/developer";
