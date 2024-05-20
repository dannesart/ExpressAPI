import { WalletService } from "@/services/wallet";
import { UserController } from "./user.controller";
import { IRequest } from "@/schema/common";
import { IUser } from "@/schema/user";
import { WalletResponse } from "@/schema/wallet";

/**
 * Services
 */
const walletService = new WalletService(
  process.env.APP_USE_MOCK
).GetWalletService();

export class WalletController extends UserController {
  constructor(public requestModel: IRequest) {
    super(requestModel);
  }

  public getWallet = async (walletId?: string) => {
    try {
      // Get user
      const wallet: WalletResponse = await walletService.get(walletId);

      if (wallet) {
        return wallet;
      } else {
        throw new Error("Couldnt get wallet response");
      }
    } catch (error) {
      throw error;
    }
  };
}
