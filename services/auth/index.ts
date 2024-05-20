import { Utils } from "@/utils";
import jwt from "jsonwebtoken";
import { checkOpenIdToken } from "./openid";
import {
  getUser,
  getUserByPersonalNumber,
  createUser,
  updateUser,
  getAllUsers,
  deleteUser,
} from "./user";

import {
  SmsAuthConnection,
  SmsAuthParamsScope,
  SmsAuthSend,
  SmsAuthStart,
  SmsAuthStartPostModel,
  SmsAuthValidate,
  SmsAuthValidatePostModel,
} from "@/schema/auth/sms";
import { ApiClient } from "@/utils/client";

const api = new ApiClient();

async function generateJWTtoken(user) {
  return jwt.sign(user, process.env.TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_VALID_TIME || "18000s",
  });
}

async function login(userInfo) {
  return await generateJWTtoken(userInfo);
}

async function verifyUser(token) {
  try {
    const cleanToken = token.startsWith("Bearer") ? token.split(" ")[1] : token;
    const verify = await jwt.verify(
      cleanToken,
      process.env.TOKEN_SECRET as string
    );
    return verify;
  } catch (error) {
    throw error;
  }
}

async function verifyUserByPhone(phoneNumber) {
  const correct = Utils.VerifyPhoneNumber(phoneNumber);
  if (phoneNumber && correct) return true;

  return false;
}

async function smsAuthValidate(otp: string, phoneNumber: string) {
  try {
    const authObject: SmsAuthValidate = {
      grant_type: "http://auth0.com/oauth/grant-type/passwordless/otp",
      client_id: process.env.AUTH_CLIENT_ID,
      client_secret: process.env.AUTH_CLIENT_SECRET,
      otp: otp + "",
      audience: process.env.AUTH_AUDIENCE,
      username: phoneNumber.replace(/ /g, ""),
      scope: "openid phone client_id",
      realm: "sms",
    };

    if (SmsAuthValidatePostModel.valid(authObject)) {
      const url = `${process.env.AUTH_ISSUER_BASE_URL}/oauth/token`;
      const smsAuthValidateResponse = (await api.post(
        url,
        authObject,
        {}
      )) as any;
      return smsAuthValidateResponse.data;
    } else {
      throw new Error("Wrong model");
    }
  } catch (error) {
    throw error;
  }
}

async function authValidateByPhone(otp: string, phoneNumber: string) {
  try {
    const response = await smsAuthValidate(otp, phoneNumber);

    return {
      ...response,
    };
  } catch (error) {
    throw error;
  }
}

async function smsAuthStart(phoneNumber: string, client_id: string) {
  try {
    const authObject: SmsAuthStart = {
      client_id: process.env.AUTH_CLIENT_ID,
      client_secret: process.env.AUTH_CLIENT_SECRET,
      send: SmsAuthSend.code,
      connection: SmsAuthConnection.sms,
      phone_number: phoneNumber.replace(/ /g, ""),
      authParams: {
        scope: `${SmsAuthParamsScope.openid} ${SmsAuthParamsScope.phone} ${SmsAuthParamsScope.clientId}`,
        client_id: `${client_id}`,
        state: `client_id=${client_id}`,
        custom: `client_id=${client_id}`,
      },
    };

    if (SmsAuthStartPostModel.valid(authObject)) {
      const url = `${process.env.AUTH_ISSUER_BASE_URL}/passwordless/start`;
      const smsAuthStartResponse = (await api.post(url, authObject, {})) as any;
      return smsAuthStartResponse.data;
    }
  } catch (error) {
    throw error;
  }
}

async function authUserByPhone(phoneNumber: string, client_id: string) {
  // Check if user exists
  try {
    // Verify
    const correct = await verifyUserByPhone(phoneNumber);
    if (!correct) throw new Error("Phone number is not correct formatted");

    // Start validation by sms
    await smsAuthStart(phoneNumber, client_id);
    return true;
  } catch (error) {
    throw error;
  }
}

async function verifyUserId(peyyaUserId: string, token: string) {
  const user = await verifyUser(token);
  return !!user;
}

export {
  login,
  verifyUser,
  verifyUserId,
  getUser,
  getUserByPersonalNumber,
  createUser,
  updateUser,
  getAllUsers,
  deleteUser,
  checkOpenIdToken,
  authUserByPhone,
  verifyUserByPhone,
  authValidateByPhone,
  smsAuthStart,
  smsAuthValidate,
};
