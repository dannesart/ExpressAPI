import { IUser, IAccountType, IUserTypes } from "@/schema/user";

const mockUserShopper: IUser = {
  id: "2c509acd-f332-4679-84b8-fc690b81bab3",
  firstName: "Bob",
  lastName: "Gunnerson",
  email: "bob.gunnerson@lorem.com",
  mobilePhone: "+46 70 9198104",
  wallets: [],
  userName: "Bob Gunnerson",
  status: 1,
  personalNumber: "",
  role: "",
  userType: [IUserTypes.shopper],
  accountType: IAccountType.private,
  client_id: "ad492cec-ae9b-413f-8f64-d08211bc5678",
};

export { mockUserShopper };
