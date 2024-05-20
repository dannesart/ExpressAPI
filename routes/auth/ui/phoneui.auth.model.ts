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
const phoneUiAuthRequestModel: IRequest = {
  method: "GET",
  path: "/ui",
  tags: ["Authorize"],
  description: "Validate authorization",
  request: {
    headers: {
      client_id: {
        type: RequestHeaderTypes.string,
        required: true,
        in: "query",
      },
      return_url: {
        type: RequestHeaderTypes.string,
        required: true,
        in: "query",
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
      error: AuthErrorMessage.couldNotAuthenticate,
      errorCode: AuthErrorCodes.couldNotAuthenticate + "4",
      description: AuthErrorMessage.couldNotAuthenticate,
    },
    [ErrorStatuses.badRequest]: {
      status: ErrorStatuses.badRequest,
      error: AuthErrorMessage.requestIsAlreadyInProgress,
      errorCode: AuthErrorCodes.requestIsAlreadyInProgress + "4",
      description: AuthErrorMessage.requestIsAlreadyInProgress,
    },
  },
};

export default phoneUiAuthRequestModel;
