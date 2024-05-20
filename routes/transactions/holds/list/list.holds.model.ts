import { IRequest } from "@/schema";
import { RequestHeaderTypes } from "@/schema/common";
import {
  ErrorMessages,
  ErrorStatuses,
  UserErrorCodes,
  UserErrorMessages,
} from "@/vendor/errors";

const listHoldsRequestModel: IRequest = {
  method: "GET",
  path: "/:peyyaUserId/holds",
  tags: ["Transactions"],
  description: "Get holds",
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
      errorCode: UserErrorCodes.userNotFound + "45",
    },
    [ErrorStatuses.unauthorized]: {
      status: ErrorStatuses.unauthorized,
      error: UserErrorMessages.userTokenIsInvalid,
      errorCode: UserErrorCodes.userTokenIsInvalid + "45",
    },
    [ErrorStatuses.expectationFailed]: {
      status: ErrorStatuses.expectationFailed,
      error: ErrorMessages.notBeFetched,
      errorCode: "cnbf45",
    },
  },
};

export default listHoldsRequestModel;
