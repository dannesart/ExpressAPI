import {
  RequestHeaderTypes,
  IRequest,
  RequestBodyTypes,
} from "@/schema/common";
import {
  ErrorStatuses,
  UserErrorCodes,
  UserErrorMessages,
} from "@/vendor/errors";

/**
 * Verify user model.
 * Used for swagger.
 */
const verifyUserRequestModel: IRequest = {
  method: "POST",
  path: "/kyc/extended",
  description: "Provide with extended information. This is KYC 2",
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
      peyyaUserId: {
        type: RequestHeaderTypes.string,
        required: true,
        in: "path",
      },
    },
    body: {
      nationality: {
        type: RequestBodyTypes.string,
        required: true,
        in: "body",
      },
      identityType: {
        type: RequestBodyTypes.string,
        required: true,
        in: "body",
      },
      identityNumber: {
        type: RequestBodyTypes.string,
        required: true,
        in: "body",
      },
      birthDate: {
        type: RequestBodyTypes.string,
        required: false,
        in: "body",
      },
      issueDate: {
        type: RequestBodyTypes.string,
        required: false,
        in: "body",
      },
      expiryDate: {
        type: RequestBodyTypes.string,
        required: false,
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
      errorCode: UserErrorCodes.userNotUpdated + "14",
    },
    [ErrorStatuses.unauthorized]: {
      status: ErrorStatuses.unauthorized,
      error: UserErrorMessages.userTokenIsInvalid,
      errorCode: UserErrorCodes.userTokenIsInvalid + "14",
    },
  },
};

export default verifyUserRequestModel;
