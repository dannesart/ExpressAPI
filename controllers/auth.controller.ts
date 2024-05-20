import { Controller, IRequest } from "@/schema/common";
import {
  verifyUser,
  checkOpenIdToken,
  verifyUserByPhone,
} from "@/services/auth";
import { auth } from "express-oauth2-jwt-bearer";

import {
  ErrorStatuses,
  UserErrorCodes,
  UserErrorMessages,
} from "@/vendor/errors";

// const checkJwt = auth({
//   audience: process.env.AUTH_AUDIENCE,
//   issuerBaseURL: process.env.AUTH_ISSUER_BASE_URL,
// });

export class AuthController extends Controller {
  constructor(public requestModel: IRequest) {
    super();
  }

  /**
   * Verify token, if error, @return ErrorStatuses.unauthorized error
   * @param authToken
   *
   */
  public verifyUser = checkOpenIdToken();

  /**
   * Verify phone
   */
  public verifyPhone = verifyUserByPhone;

  // OLD
  public _verifyUser = async (req, res, next) => {
    // Get auth token.
    const authToken = req.headers.authorization;

    // Verify token.
    try {
      await verifyUser(authToken);
    } catch (error) {
      res.statusCode = ErrorStatuses.unauthorized;
      return res.send({
        status: ErrorStatuses.unauthorized,
        error: UserErrorMessages.userTokenIsInvalid,
        errorCode: UserErrorCodes.userTokenIsInvalid + "1",
      });
    }
    req.headers.authorization = authToken;
    next();
  };
}
