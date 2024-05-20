import { IRequest } from "@/schema";
import { RequestBodyTypes, RequestHeaderTypes } from "@/schema/common";
import {
  ErrorStatuses,
  UserErrorCodes,
  UserErrorMessages,
  WalletErrorCodes,
  WalletErrorMessages,
} from "@/vendor/errors";

const patchApplicationRequestModel: IRequest = {
  method: "PATCH",
  path: "/:applicationId",
  tags: ["Developer", "Application"],
  description: "Update application based on applicationId and body data",
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
      applicationId: {
        type: RequestHeaderTypes.applicationId,
        required: true,
        in: "path",
      },
    },
    body: {
      sandbox: {
        type: RequestBodyTypes.boolean,
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
      message: "The application was successful updated",
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

export default patchApplicationRequestModel;
