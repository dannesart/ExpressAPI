import { IRequest } from "@/schema";
import { RequestHeaderTypes } from "@/schema/common";
import {
  ErrorStatuses,
  UserErrorCodes,
  UserErrorMessages,
  WalletErrorCodes,
  WalletErrorMessages,
} from "@/vendor/errors";

const historyTransactionRequestModel: IRequest = {
  method: "GET",
  path: "/history",
  tags: ["Transactions"],
  description: "Get transaction history",
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
      amount: {
        type: RequestHeaderTypes.number,
        required: false,
        in: "query",
      },
      sort: {
        type: RequestHeaderTypes.number,
        required: false,
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
    [ErrorStatuses.notFound]: {
      status: ErrorStatuses.notFound,
      error: UserErrorMessages.userNotFound,
      errorCode: UserErrorCodes.userNotFound + "15",
    },
    [ErrorStatuses.expectationFailed]: {
      status: ErrorStatuses.expectationFailed,
      error: WalletErrorMessages.walletHistory,
      errorCode: WalletErrorCodes.walletHistory + "15",
    },
    [ErrorStatuses.unauthorized]: {
      status: ErrorStatuses.unauthorized,
      error: UserErrorMessages.userTokenIsInvalid,
      errorCode: UserErrorCodes.userTokenIsInvalid + "15",
    },
  },
};

export default historyTransactionRequestModel;
