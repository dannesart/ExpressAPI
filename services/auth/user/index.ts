import DatabaseService from "@/utils/db";
import mongoose from "mongoose";
import User, { IUser } from "@/schema/user";
import { PaymentService } from "@/services/payment/payment.service";
import { defaultRole } from "@/services/role";
import { IAccountType, IUserTypes } from "@/schema/user/user";

const paymentService = new PaymentService(
  process.env.APP_USE_MOCK
).GetPaymentService();

export async function getUser(userId: string): Promise<IUser> {
  // const db = DatabaseService.getDb();
  const id = new mongoose.Types.ObjectId(userId);
  // const user: IUser = await db.collections.users.collection
  const user = await User.findOne({
    _id: userId,
  }).catch((error) => {
    console.log("Couldn't find a user with that userId", error);
    return Promise.reject(
      "[getUserByUserId] Couldn't find a user with that userId"
    );
  });
  const userJson: IUser = user.toJSON();
  // const u = user as IUser;
  return Promise.resolve(userJson);
}

export async function getUserByPersonalNumber(
  personalNumber: string
): Promise<any> {
  // const db = DatabaseService.getDb();
  // const user: IUser = await db.collections.users.collection
  const user: IUser = await User.findOne({
    personalNumber,
  }).catch((error) => {
    return Promise.reject(
      "[getUserByPersonalNumber] Couldn't find a user with that personalnumber"
    );
  });
  // const u = user as IUser;
  return Promise.resolve(user);
}

export async function getUserByEmail(email: string): Promise<any> {
  // const db = DatabaseService.getDb();
  // const user: IUser = await db.collections.users.collection
  try {
    const user: IUser = await User.findOne({
      email,
    });
    if (!user) {
      throw new Error("Create user by email is deprecated");
      // const newUser = await createUser({
      //   email,
      // });
      // user = newUser.user;
    }
    return user;
  } catch (error) {
    throw error;
  }
}

export async function getUserByTelephoneNumber(
  mobilePhone: string
): Promise<IUser> {
  // const db = DatabaseService.getDb();
  // const user: IUser = await db.collections.users.collection
  try {
    const user: IUser = await User.findOne({
      mobilePhone,
    });
    return user;
  } catch (error) {
    throw error;
  }
}

export async function updateUser(user: IUser | any): Promise<any> {
  const { mobilePhone, status, id, dfnsId, wallets, firstName, lastName } =
    user;

  // const save = await db.collections.users.collection
  try {
    const save: IUser = await User.findOneAndUpdate(
      { _id: id },
      { $set: user },
      { upsert: true }
    );
    return save;
  } catch (error) {
    throw new Error("Couldn't update the user with new data: " + error);
  }
}

export async function createUser({
  mobilePhone,
  client_id,
  role = defaultRole.name,
  wallets,
}: {
  mobilePhone: string;
  client_id: string;
  role?: string;
  wallets: string[];
}): Promise<any> {
  const userObject: IUser = {
    id: "",
    firstName: "",
    lastName: "",
    status: 0,
    client_id,
    userType: [IUserTypes.shopper],
    accountType: IAccountType.private,
    wallets: wallets || [],
    email: "",
    mobilePhone: mobilePhone.replace(/ /g, ""),
    role,
  };

  const userDocument = new User(userObject);
  try {
    const saved = await userDocument.save();

    const newUser = {
      mobilePhone: saved.mobilePhone,
      wallets: saved.wallets,
      id: saved.id || saved._id.toString(),
      firstName: saved.firstName,
      lastName: saved.lastName,
    };
    return Promise.resolve({
      user: newUser,
      status: "success",
      statusCode: 200,
    });
  } catch (error) {
    throw error;
  }
}

export async function mockUserName() {
  const starts = [
    "hey",
    "moj",
    "gre",
    "soy",
    "foo",
    "mow",
    "plu",
    "sko",
    "tja",
  ];
  const ends = ["pre", "tri", "clu", "erp", "dop", "say", "voi", "lef", "rej"];
  const startIdx = Math.floor(Math.random() * starts.length);
  const endIdx = Math.floor(Math.random() * ends.length);
  return `0x${starts[startIdx]}${startIdx}${ends[endIdx]}${endIdx}`;
}

export async function getAllUsers(phone?: string): Promise<any> {
  // Get all users by running User.find. This will return all entities.
  try {
    // Set up users variable.
    // This will be defined based on if user wants to search for user.
    let users: IUser[];
    if (phone) {
      // Check if phone starts with a + else add it
      phone = phone.startsWith("+") ? phone : `+${phone.trim()}`;
      // TODO: Have a look at this.
      // Perhaps, this needs to be reformated.
      // If we don't want to exposure "wrong" data.
      // this can only happen if user adds a phone search param.
      users = await User.find({
        mobilePhone: phone,
      });
    } else {
      // This case will only happend if user have admin role.
      users = await User.find();
    }
    // Return list if no errors.
    return users;
  } catch (error) {
    // Else throw error.
    throw error;
  }
}

export async function deleteUser(peyyaUserId: string): Promise<any> {
  try {
    await User.findByIdAndRemove(peyyaUserId);
  } catch (error) {
    throw error;
  }
}
