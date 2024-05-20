import mongoose from "mongoose";
import { IUser } from "@/schema/user";
import { MockAuthService, verifyUserByPhone } from "@/services/auth/mock";
import jwt from "jsonwebtoken";
import { mockUserShopper } from "../../../mocks/Users";
require("dotenv").config();

const authService = new MockAuthService();

describe("Auth service", () => {
  beforeAll(async () => {
    process.env.TOKEN_SECRET =
      "03166e94f10f6291248bb90be199c0e71b791953d08356c1ef5a7e41dab82ca5576877ac7ad5456aaf83c9e39b23dd25adb893c8bdd9657eb89a3591e4fac4d4";
    process.env.TOKEN_VALID_TIME = "1800s";
  });
  afterAll(async (done) => {
    await mongoose.disconnect();
    return done();
  });
  describe("Verify by phone", () => {
    it("Should pass with correct phone format", async () => {
      const verify = await verifyUserByPhone("+46 70 9198104");
      return expect(verify).toBeTruthy();
    });

    it("Should fail with incorrect phone format", async () => {
      const verify = await verifyUserByPhone("0709198104");
      return expect(verify).toBeFalsy();
    });

    it("Should fail with no phone at all", async () => {
      const verify = await verifyUserByPhone(null);
      return expect(verify).toBeFalsy();
    });
  });

  describe("Authorize by phone", () => {
    it("Should pass with correct phone format", async () => {
      return authService.authUserByPhone("+46 70 9198104").then((response) => {
        expect(response).toEqual(true);
      });
    });
    it("Should fail with invalid phone format", () => {
      expect(async () => {
        await authService.authUserByPhone("070 9198104");
      }).rejects.toThrow("Phone number is not correct formatted");
    });
  });

  describe("SMS Auth", () => {
    it("Should resolve if phone number is provided", async () => {
      expect(async () => {
        await authService.smsAuth("+46 70 9198104");
      }).toBeTruthy();
    });

    it("Should reject and get an error if phone number is not provided", async () => {
      expect(async () => {
        await authService.smsAuth(null);
      }).rejects.toBe("Missing phone number");
    });
  });

  describe("Generate token", () => {
    it("Should be a valid token if user is provided", async () => {
      const user: IUser = mockUserShopper;
      const token = await authService.generateJWTtoken(user);
      const validToken = await authService.verifyUser(token);
      expect(validToken).toMatchObject(user);
    });
  });
});
