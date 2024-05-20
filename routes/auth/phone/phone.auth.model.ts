import { AuthErrorMessage, AuthErrorCodes } from "../../../vendor/errors";
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
const phoneAuthRequestModel: IRequest = {
  method: "POST",
  path: "/phone",
  tags: ["Authorize"],
  description: "Start authorization by phone",
  request: {
    headers: {
      client_id: {
        type: RequestHeaderTypes.string,
        required: true,
        in: "headers",
      },
    },
    body: {
      phoneNumber: {
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
      errorCode: UserErrorCodes.userNotUpdated + "4",
      description: UserErrorMessages.userNotUpdated,
    },
    [ErrorStatuses.badRequest]: {
      status: ErrorStatuses.badRequest,
      error: AuthErrorMessage.requestIsAlreadyInProgress,
      errorCode: AuthErrorCodes.requestIsAlreadyInProgress + "4",
      description: AuthErrorMessage.requestIsAlreadyInProgress,
    },
  },
};

export default phoneAuthRequestModel;
