import { IRequest } from "@/schema/common";
import { IUser } from "@/schema/user";
import { AuthController } from "./auth.controller";
import { getUser, updateUser, getAllUsers, deleteUser } from "@/services/auth";
import { ErrorStatuses, UserErrorMessages } from "@/vendor/errors";
import { getUserByTelephoneNumber } from "@/services/auth/user";

const auth0Namespace = "https://peyya.io/";

export class UserController extends AuthController {
  constructor(public requestModel: IRequest) {
    super(requestModel);
  }

  /**
   * Get user by token. Or throw an Error
   * @param peyyaUserId
   *
   * @returns user (IUser)
   */
  public getUser = async (peyyaUserId: string) => {
    let userObject = {};
    try {
      // First get peyya user
      const user: IUser = await getUser(peyyaUserId);
      userObject = { ...user };
      // Then, get payment user compliance information.

      userObject = {
        ...userObject,
      };
      return userObject as IUser;
    } catch (error) {
      throw error;
    }
  };

  /**
   * Get user by phone number. Or throw an Error
   * @param phoneNumber
   *
   * @returns user (IUser)
   */
  public getUserByPhone = async (phoneNumber: string) => {
    let userObject = {};
    try {
      // First get peyya user
      const user: IUser = await getUserByTelephoneNumber(phoneNumber);
      const { mobilePhone, status, firstName, lastName, wallets } = user;
      const id: string = (user._id || user.id).toString();
      userObject = {
        mobilePhone,
        status,
        wallets,
        id,
        firstName,
        lastName,
      };

      return userObject as IUser;
    } catch (error) {
      throw error;
    }
  };

  /**
   * Get user middleware
   */
  public getUserMiddleWare = async (req, res, next) => {
    const tokenUser = (req as any).user;
    if (tokenUser) {
      const tokenPhone = tokenUser[`${auth0Namespace}phone`].replace(/ /g, "");
      if (tokenPhone) {
        try {
          // First get peyya user
          const user: IUser = await getUserByTelephoneNumber(tokenPhone);
          if (!user) {
            throw new Error("No user found");
          }
          const { mobilePhone, status, firstName, lastName, wallets } = user;
          const id: string = (user._id || user.id).toString();

          req.peyyaUser = {
            mobilePhone,
            status,
            wallets,
            id,
            firstName,
            lastName,
          };
          return next();
        } catch (error) {
          return res.status(404).send({
            error: error.message || error.stack || error,
            status: "No user found",
          });
        }
      }
    }

    return res.status(401).send({
      error: "Missing email in auth token",
    });
  };

  /**
   * Get user by token. Or throw an Error
   * @param peyyaUserId
   *
   * @returns user (IUser)
   */
  public updateUser = async (user: IUser | any) => {
    try {
      await updateUser(user);
      return user;
    } catch (updateError) {
      if (
        this.requestModel &&
        this.requestModel.responses[ErrorStatuses.expectationFailed]
      ) {
        throw new Error(
          updateError ||
            this.requestModel.responses[ErrorStatuses.expectationFailed].error
        );
      } else {
        throw new Error(updateError || UserErrorMessages.userNotUpdated);
      }
    }
  };

  /**
   * Get all users.
   * @returns list of users from db.
   * And ref to paymentService.
   */
  public getAllUsers = async (phone?: string) => {
    try {
      const allUsers = await getAllUsers(phone);
      return allUsers;
    } catch (error) {
      throw error;
    }
  };

  /**
   * Delete peyya user
   *
   */
  public deleteUser = async (peyyaUserId: string) => {
    try {
      const user = await await getUser(peyyaUserId);
      await this.updateUser({ ...user, status: 0 });
      // TODO: Fix this. Handle this diffrently.
      // await payementUserService.DeleteUser(user.paymentUserId);
      // await this.updateUser({ ...user, status: "deleting 2" });
      await deleteUser(peyyaUserId);
    } catch (error) {
      throw error;
    }
  };
}
