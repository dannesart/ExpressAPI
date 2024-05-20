import { IRequest } from "@/schema";
import { RequestHeaderTypes } from "@/schema/common";
import {
  ErrorStatuses,
  UserErrorCodes,
  UserErrorMessages,
} from "@/vendor/errors";

const deleteUserRequestModel: IRequest = {
  method: "DELETE",
  path: "/",
  tags: ["Users"],
  description: "Delete user based on auth token",
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
      errorCode: UserErrorCodes.userNotFound + "8",
    },
    [ErrorStatuses.activeWallet]: {
      status: ErrorStatuses.activeWallet,
      error: "Can not delete user with an active wallet",
      errorCode: "duaw2",
    },
    [ErrorStatuses.unauthorized]: {
      status: ErrorStatuses.unauthorized,
      error: UserErrorMessages.userTokenIsInvalid,
      errorCode: UserErrorCodes.userTokenIsInvalid + "8",
    },
  },
};

export default deleteUserRequestModel;
