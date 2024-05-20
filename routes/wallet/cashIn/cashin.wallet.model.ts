import { IRequest } from "@/schema";
import { RequestBodyTypes, RequestHeaderTypes } from "@/schema/common";
import {
  ErrorStatuses,
  UserErrorCodes,
  UserErrorMessages,
  WalletErrorCodes,
  WalletErrorMessages,
} from "@/vendor/errors";

const cashInWalletRequestModel: IRequest = {
  method: "POST",
  path: "/cashIn",
  tags: ["Wallet"],
  description: "Cash in to a wallet",
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
      amount: {
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
      errorCode: UserErrorCodes.userNotFound + "6",
    },
    [ErrorStatuses.expectationFailed]: {
      status: ErrorStatuses.expectationFailed,
      error: WalletErrorMessages.walletNotCashIn,
      errorCode: WalletErrorCodes.walletNotCashIn,
    },
    [ErrorStatuses.unauthorized]: {
      status: ErrorStatuses.unauthorized,
      error: UserErrorMessages.userTokenIsInvalid,
      errorCode: UserErrorCodes.userTokenIsInvalid + "6",
    },
  },
};

export default cashInWalletRequestModel;
