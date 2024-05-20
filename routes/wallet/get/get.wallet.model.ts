import { IRequest } from "@/schema";
import { RequestHeaderTypes } from "@/schema/common";
import {
  ErrorStatuses,
  UserErrorCodes,
  UserErrorMessages,
  WalletErrorCodes,
  WalletErrorMessages,
} from "@/vendor/errors";

const getWalletRequestModel: IRequest = {
  method: "GET",
  path: "",
  tags: ["Wallet"],
  description: "Get wallet based on walletId",
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
      message: "The wallet was successful fetched",
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

export default getWalletRequestModel;
