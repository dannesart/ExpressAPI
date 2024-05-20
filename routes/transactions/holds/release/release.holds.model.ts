import { IRequest } from "@/schema";
import { RequestBodyTypes, RequestHeaderTypes } from "@/schema/common";
import {
  ErrorStatuses,
  UserErrorCodes,
  UserErrorMessages,
} from "@/vendor/errors";

const releaseHoldsRequestModel: IRequest = {
  method: "POST",
  path: "/holds/:holdId/release",
  tags: ["Transactions"],
  description: "Release a hold",
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
    },
    body: {
      amount: {
        type: RequestBodyTypes.number,
        required: true,
        in: "body",
      },
      targetWallet: {
        type: RequestBodyTypes.peyyaUserId,
        required: true,
        in: "body",
      },
      expiration: {
        type: RequestBodyTypes.date,
        required: true,
        in: "body",
      },
      concept: {
        type: RequestBodyTypes.string,
        required: true,
        in: "body",
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
      errorCode: UserErrorCodes.userNotFound + "11",
    },
    [ErrorStatuses.unauthorized]: {
      status: ErrorStatuses.unauthorized,
      error: UserErrorMessages.userTokenIsInvalid,
      errorCode: UserErrorCodes.userTokenIsInvalid + "11",
    },
  },
};

export default releaseHoldsRequestModel;
