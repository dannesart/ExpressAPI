import { IRequest } from "@/schema";
import { RequestHeaderTypes } from "@/schema/common";
import {
  ErrorStatuses,
  UserErrorCodes,
  UserErrorMessages,
} from "@/vendor/errors";

const getHoldsRequestModel: IRequest = {
  method: "GET",
  path: "/holds/:holdId",
  tags: ["Transactions"],
  description: "Get specific hold",
  request: {
    /**
     * Required headers.
     */
    headers: {
      authorization: {
        type: RequestHeaderTypes.token,
        required: true,
        in: "header",
      },
      peyyaUserId: {
        type: RequestHeaderTypes.peyyaUserId,
        required: true,
        in: "path",
      },
      holdId: {
        type: RequestHeaderTypes.string,
        required: true,
        in: "path",
      },
    },
  },
  /**
   * All different response types.
   * Verify user can have response of...
   */
  responses: {
    200: {
      status: 200,
    },
    [ErrorStatuses.notFound]: {
      status: ErrorStatuses.notFound,
      error: UserErrorMessages.userNotFound,
      errorCode: UserErrorCodes.userNotFound + "14",
    },
    [ErrorStatuses.unauthorized]: {
      status: ErrorStatuses.unauthorized,
      error: UserErrorMessages.userTokenIsInvalid,
      errorCode: UserErrorCodes.userTokenIsInvalid + "14",
    },
  },
};

export default getHoldsRequestModel;
