import { IAuthService, IAuthServiceResponse } from "@/schema/auth";
import { IUser } from "@/schema/user";
import { Utils } from "@/utils";
import jwt from "jsonwebtoken";

export const verifyUserByPhone = async (phoneNumber) => {
  const correct = Utils.VerifyPhoneNumber(phoneNumber);
  if (phoneNumber && correct) return true;

  return false;
};

export class MockAuthService implements IAuthService {
  async smsAuth(phoneNumber): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!phoneNumber) {
        return reject("Missing phone number");
      }
      setTimeout(() => {
        resolve(true);
      }, 500);
    });
  }

  async authUserByPhone(phoneNumber: string) {
    // Check if user exists
    const correct = await verifyUserByPhone(phoneNumber);

    return new Promise((resolve, reject) => {
      try {
        if (!correct) throw new Error("Phone number is not correct formatted");
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  }

  async login(_user: IUser): Promise<IAuthServiceResponse> {
    return Promise.resolve({
      status: true,
    });
  }

  async verifyUser(
    authorizationToken: string
  ): Promise<string | jwt.JwtPayload> {
    try {
      const cleanToken = authorizationToken.startsWith("Bearer")
        ? authorizationToken.split(" ")[1]
        : authorizationToken;
      const verify = await jwt.verify(
        cleanToken,
        process.env.TOKEN_SECRET as string
      );
      return Promise.resolve(verify);
    } catch (error) {
      throw error;
    }
  }

  async generateJWTtoken(user: IUser): Promise<string> {
    if (user) {
      user = user;
    }
    return jwt.sign(user, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_VALID_TIME || "18000s",
    });
  }
}
