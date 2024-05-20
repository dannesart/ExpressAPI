/**
 * Controller
 */
import { WalletController } from "@/controllers/wallet.controller";
import { IWallet, Wallet } from "@/schema/wallet";

/**
 * Services
 */
import { PaymentService } from "@/services/payment/payment.service";
import { NewUser } from "@/services/wallet/dfns/new.pk.user.service";
const paymentService = new PaymentService(
  process.env.APP_USE_MOCK
).GetPaymentService();

const dfnsUser = new NewUser();

/**
 * Schemas
 */

/**
 * Model
 */
import Model from "./cashin.wallet.model";

export class CashInWalletController extends WalletController {
  constructor() {
    super(Model);
  }

  public init = async (req, res, next) => {
    try {
      const { peyyaUser, body } = req;
      const { amount } = body;
      const { wallets } = peyyaUser;
      const walletId = wallets[0].toString();
      const { publicKey, displayAddress }: IWallet = await Wallet.findOne({
        _id: walletId,
      });

      await dfnsUser.topUpWallet(displayAddress);
      res.send({
        message: "Top up was successful",
      });
    } catch (error) {
      res.status(500).send({
        message: "Could not top up. Please try again",
      });
    }
  };
}
