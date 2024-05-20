import { IRequest } from "@/schema";
import { RequestBodyTypes, RequestHeaderTypes } from "@/schema/common";
import {
  ErrorStatuses,
  UserErrorCodes,
  UserErrorMessages,
  WalletErrorCodes,
  WalletErrorMessages,
} from "@/vendor/errors";

const getDeveloperRequestModel: IRequest = {
  method: "GET",
  path: "/",
  tags: ["Developer"],
  description: "Get developer based on developerId",
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

export default getDeveloperRequestModel;
