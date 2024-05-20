import { IRequest } from "@/schema";
import { RequestBodyTypes, RequestHeaderTypes } from "@/schema/common";
import {
  ErrorStatuses,
  UserErrorCodes,
  UserErrorMessages,
  WalletErrorCodes,
  WalletErrorMessages,
} from "@/vendor/errors";

const postApplicationRequestModel: IRequest = {
  method: "POST",
  path: "/application",
  tags: ["Developer", "Application"],
  description: "Create new application",
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
      name: {
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
      message: "The developer was successful created",
    },
    [ErrorStatuses.notFound]: {
      status: ErrorStatuses.notFound,
      error: WalletErrorCodes.walletNotFound,
      errorCode: WalletErrorMessages.walletNotFound + "1",
    },
    [ErrorStatuses.unauthorized]: {
      status: ErrorStatuses.unauthorized,
      error: UserErrorMessages.userTokenIsInvalid,
      errorCode: UserErrorCodes.userTokenIsInvalid + "8",
    },
  },
};

export default postApplicationRequestModel;
