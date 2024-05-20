import { IRequest } from "@/schema";
import { RequestBodyTypes, RequestHeaderTypes } from "@/schema/common";
import {
  ErrorStatuses,
  UserErrorCodes,
  UserErrorMessages,
} from "@/vendor/errors";

const transferTransactionRequestModel: IRequest = {
  method: "POST",
  path: "/send",
  tags: ["Transactions"],
  description: "Create a transfer from one user to another",
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
    },
    body: {
      targetPhoneNumber: {
        type: RequestBodyTypes.string,
        required: true,
        in: "body",
      },
      amount: {
        type: RequestBodyTypes.number,
        required: true,
        in: "body",
      },
      message: {
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
      errorCode: UserErrorCodes.userNotFound + "10",
    },
    [ErrorStatuses.unauthorized]: {
      status: ErrorStatuses.unauthorized,
      error: UserErrorMessages.userTokenIsInvalid,
      errorCode: UserErrorCodes.userTokenIsInvalid + "10",
    },
    [ErrorStatuses.expectationFailed]: {
      status: ErrorStatuses.expectationFailed,
      error: UserErrorMessages.expectationFailed,
      errorCode: UserErrorCodes.expectationFailed + "10",
    },
  },
};

export default transferTransactionRequestModel;
