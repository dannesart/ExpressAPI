/**
 * Controller
 */
import { DeveloperController } from "@/controllers/developer.controller";
import { Wallet } from "@/schema/wallet";
import { authValidateByPhone, createUser, updateUser } from "@/services/auth";
import { getUserByTelephoneNumber } from "@/services/auth/user";
import { WalletService } from "@/services/wallet";
import { NewUser } from "@/services/wallet/dfns/new.pk.user.service";
import { Utils } from "@/utils";
import { ErrorStatuses } from "@/vendor/errors";

/**
 * Model
 */
import Model from "./phonevalidate.auth.model";

const dfnsUser = new NewUser();

const walletService = new WalletService(
  process.env.APP_USE_MOCK
).GetWalletService();

export class PhoneValidateAuthController extends DeveloperController {
  constructor() {
    super(Model);
  }

  public init = async (req, res, next) => {
    // Start validation of the sms authorization.
    // User must provide phone number and a OTP. In order to get
    try {
      // Authorize against bankid
      const phoneNumber = req.body.phoneNumber;
      const otp = req.body.otp;
      const client_id = req.headers.clientid;

      const phoneNumberString =
        typeof phoneNumber === "string" ? phoneNumber : phoneNumber + "";

      // Validate phone number.
      // The phone number must include the +{xx} xx xxxxxxx format.
      // This will return a boolean.
      const isCorrectFormatted = Utils.VerifyPhoneNumber(phoneNumberString);
      if (!isCorrectFormatted) {
        throw new Error("Phone number is not correct formatted");
      }

      // Trigger the validation. OTP (one time password) is required and phone number.
      // If success. A auth object should be retured. This includes auth token.
      const authObject = await this.validateAuth(phoneNumberString, otp);
      if (!authObject) {
        throw new Error(
          "The authorization was not completed. Please try again."
        );
      }

      // Get user by phone. If there is no user. Then create one.
      // This is not need in the auth object. But it needs to be checked and handled if false.
      let user = await getUserByTelephoneNumber(
        phoneNumberString.replace(/ /g, "")
      );
      if (!user) {
        user = await this.handleNoUser(phoneNumberString, client_id);
      }

      // Send the response.
      // Response is just the PeyyaUser object. Including wallet id.
      res.statusCode = 200;
      res.send({ ...authObject, peyyaUserId: user._id || user.id });
      ////////
      ////////
      ////////
    } catch (error) {
      // If there is an error. Handle it here.
      // Send response.
      if (error.message.indexOf(ErrorStatuses.badRequest) > -1) {
        res.statusCode = ErrorStatuses.badRequest;
        res.send(Model.responses[ErrorStatuses.badRequest]);
      } else {
        res.statusCode = ErrorStatuses.expectationFailed;
        res.send({
          ...Model.responses[ErrorStatuses.expectationFailed],
          ...{ error: error.message },
        });
      }
    }
  };

  private validateAuth = async (phoneNumber: string, otp: string) => {
    try {
      // Send OTP and phone number to the validator.
      // Returns auth object.
      const user = await authValidateByPhone(otp, phoneNumber);
      return user;
    } catch (error) {
      throw error;
    }
  };

  private handleNoUser = async (phoneNumber: string, client_id: string) => {
    try {
      // New dfns wallet.
      const newWallet = await dfnsUser.createUserWallet();
      const wallet = newWallet;

      // New peyya wallet document
      const newWalletDocument = new Wallet({
        address: wallet.id,
        displayAddress: wallet.id,
        description: "My wallet",
        publicKey: wallet.publicKey,
        status: "active",
        iban: "",
      });
      const walletDocument = await newWalletDocument.save();

      // Simply create new wallet and a new user.
      // User should include wallet id.
      // Observe. wallet id is not the same as a wallet address.
      // Wallet id is just a reference inside the peyya universe.
      //const newWallet = await walletService.create();
      const newUser = await createUser({
        mobilePhone: phoneNumber,
        client_id,
        wallets: [walletDocument.id || walletDocument._id],
      });

      // Return the new user.
      // Including the new wallet id.
      return newUser.user;
    } catch (error) {
      throw error;
    }
  };
}
