import { IRequest } from "@/schema";
import { RequestBodyTypes, RequestHeaderTypes } from "@/schema/common";
import {
  BankErrorCodes,
  BankErrorMessages,
  ErrorStatuses,
  UserErrorCodes,
  UserErrorMessages,
} from "@/vendor/errors";

const bankAuthConsentRequestModel: IRequest = {
  method: "POST",
  path: "/connect/init",
  tags: ["Banks"],
  description: "Init connection to bank",
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
    body: {},
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
      errorCode: UserErrorCodes.userNotFound + "6",
    },
    [ErrorStatuses.expectationFailed]: {
      status: ErrorStatuses.expectationFailed,
      error: BankErrorMessages.bankNotInitConsent,
      errorCode: BankErrorCodes.bankNotInitConsent,
    },
    [ErrorStatuses.unauthorized]: {
      status: ErrorStatuses.unauthorized,
      error: UserErrorMessages.userTokenIsInvalid,
      errorCode: UserErrorCodes.userTokenIsInvalid + "6",
    },
  },
};

export default bankAuthConsentRequestModel;
