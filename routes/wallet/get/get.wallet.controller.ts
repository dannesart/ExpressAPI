/**
 * Controller
 */
import { WalletController } from "@/controllers/wallet.controller";
import { IWallet, Wallet } from "@/schema/wallet";
import { NewUser } from "@/services/wallet/dfns/new.pk.user.service";

/**
 * Model
 */
import Model from "./get.wallet.model";

const dfnsUser = new NewUser();

export class GetWalletController extends WalletController {
  constructor() {
    super(Model);
  }

  public init = async (req, res, next) => {
    try {
      const { peyyaUser } = req;
      if (!peyyaUser) {
        throw new Error("Missing peyya user");
      }

      const { wallets } = peyyaUser;
      const walletId = wallets[0].toString();
      const { publicKey, displayAddress }: IWallet = await Wallet.findOne({
        _id: walletId,
      });
      //const wallet = await this.getWallet(wallets[0]);
      const balance = await dfnsUser.getBalanceOfPeyyaUserId(displayAddress);

      const wallet = { balance: balance };

      res.send({
        ...Model.responses[200],
        ...wallet,
      });
    } catch (error) {
      res.statusCode = 500;
      res.send({
        status: 500,
        error: "Could not get wallet",
      });
    }
  };
}
