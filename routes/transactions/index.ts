/**
 * Dependencies
 */
import express from "express";

/**
 * Endpoints for user. Create, update, get, delete etc.
 */
const router = express.Router();

import {
  Route as GetHoldRoute,
  Model as getHoldsRequestModel,
} from "./holds/get";

import {
  Route as ListHoldRoute,
  Model as listHoldsRequestModel,
} from "./holds/list";

import {
  Route as ReleaseHoldRoute,
  Model as releaseHoldsRequestModel,
} from "./holds/release";

import {
  Route as PostHoldsRoute,
  Model as postHoldRequestModel,
} from "./holds/post";

import {
  Route as TransferRoute,
  Model as transferRequestModel,
} from "./transfer";

import { Route as HistoryRoute, Model as historyRequestModel } from "./history";

router.use(GetHoldRoute);
router.use(ReleaseHoldRoute);
router.use(ListHoldRoute);
router.use(PostHoldsRoute);
router.use(TransferRoute);
router.use(HistoryRoute);

export default router;

export {
  postHoldRequestModel,
  getHoldsRequestModel,
  historyRequestModel,
  transferRequestModel,
  releaseHoldsRequestModel,
  listHoldsRequestModel,
};

export const path = "/transactions";
