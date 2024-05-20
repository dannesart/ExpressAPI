import { ConfigParams } from "express-openid-connect";

export const config: ConfigParams = {
  authorizationParams: {
    response_type: "code",
  },
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH_SECRET,
  baseURL: process.env.AUTH_BASE_URL,
  clientID: process.env.AUTH_CLIENT_ID,
  issuerBaseURL: process.env.AUTH_ISSUER_BASE_URL,
};
