import { IRequest } from "@/schema";
import { RequestBodyTypes, RequestHeaderTypes } from "@/schema/common";
import {
  ErrorStatuses,
  UserErrorCodes,
  UserErrorMessages,
} from "@/vendor/errors";

/**
 * Resend verification model.
 * Used for swagger.
 */
const updateUserRequestModel: IRequest = {
  method: "POST",
  path: "/kyc",
  description: "Provide more information about the user. This is KYC step 1",
  tags: ["Users"],
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
      firstName: {
        type: RequestBodyTypes.string,
        required: true,
        in: "body",
      },
      lastName: {
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
    [ErrorStatuses.expectationFailed]: {
      status: ErrorStatuses.expectationFailed,
      error: UserErrorMessages.userNotUpdated,
      errorCode: UserErrorCodes.userNotUpdated + "5",
      description: UserErrorMessages.userNotUpdated,
    },
    [ErrorStatuses.unauthorized]: {
      status: ErrorStatuses.unauthorized,
      error: UserErrorMessages.userTokenIsInvalid,
      errorCode: UserErrorCodes.userTokenIsInvalid + "5",
      description: UserErrorMessages.userTokenIsInvalid,
    },
  },
};

export default updateUserRequestModel;
