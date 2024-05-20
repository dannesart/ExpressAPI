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
  path: "/cashOut",
  tags: ["Wallet"],
  description: "Cash out from a wallet to bank account",
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
      amount: {
        type: RequestBodyTypes.string,
        required: true,
        in: "body",
      },
      concept: {
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
      message: "The cash out was successful",
    },
    [ErrorStatuses.notFound]: {
      status: ErrorStatuses.notFound,
      error: UserErrorMessages.userNotFound,
      errorCode: UserErrorCodes.userNotFound + "7",
    },
    [ErrorStatuses.expectationFailed]: {
      status: ErrorStatuses.expectationFailed,
      error: WalletErrorMessages.walletNotCashOut,
      errorCode: WalletErrorCodes.walletNotCashOut,
    },
    [ErrorStatuses.unauthorized]: {
      status: ErrorStatuses.unauthorized,
      error: UserErrorMessages.userTokenIsInvalid,
      errorCode: UserErrorCodes.userTokenIsInvalid + "7",
    },
  },
};

export default cashInWalletRequestModel;
