import { IWallet, WalletStatus } from "@/schema/wallet";

const ActiveWalletMockResponse: IWallet = {
  iban: "SE9000-1000-2133-2131", // Format: undefined,
  id: "324awdwa89fegh9tvc990d", // Format: uuid,
  status: WalletStatus.success, // Format: undefined,
  address: "0x99043jajfde934uadwad",
  displayAddress: "pk-september-saturn-uniform-a543062108",
  description: "yea.. my wallet",
  publicKey: "dcc754a3fda7bc90686390d64a804ab294bb148757ba9a8f1cc7d6e2f62cf489",
};

const InactiveWalletMockResponse: IWallet = {
  iban: "SE9000-1000-2133-2131", // Format: undefined,
  id: "324awdwa89fegh9tvc990d", // Format: uuid,
  status: WalletStatus.error, // Format: undefined,
  address: "0x99043jajfde934uadwad",
  description: "yea.. my wallet",
  displayAddress: "pk-september-saturn-uniform-a543062108",
  publicKey: "dcc754a3fda7bc90686390d64a804ab294bb148757ba9a8f1cc7d6e2f62cf489",
};

export { ActiveWalletMockResponse, InactiveWalletMockResponse };
