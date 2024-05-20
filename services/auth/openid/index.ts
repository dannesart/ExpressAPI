import { IUser } from "@/schema/user";
import { config } from "./config";
import { auth } from "express-openid-connect";
import jwt from "express-jwt";
import jwksRsa from "jwks-rsa";

require("dotenv").config();

// const authRoutes = auth(config);

// export const authService = () => {
//   return authRoutes;
// };

export const generateOpenIdToken = (user: IUser) => {
  return "";
};

export const checkOpenIdToken = () => {
  return jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `${process.env.AUTH_ISSUER_BASE_URL}/.well-known/jwks.json`,
    }),

    // Validate the audience and the issuer.
    audience: process.env.AUTH_AUDIENCE,
    issuer: process.env.AUTH_ISSUER,
    algorithms: ["RS256"],
  });
};
