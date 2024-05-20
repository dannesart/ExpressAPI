/**
 * Controller
 */
import { TransactionController } from "@/controllers/transaction.controller";

/**
 * Services
 */
import { PaymentService } from "@/services/payment/payment.service";

/**
 * Schemas
 */

/**
 * Model
 */
import { IWallet, Wallet } from "@/schema/wallet";
import Transaction from "@/schema/wallet/transaction";
import { NewUser } from "@/services/wallet/dfns/new.pk.user.service";
import { ITransaction } from "@/services/wallet/dfns/schemas";
import { ErrorStatuses } from "@/vendor/errors";
import Model from "./transfer.transactions.model";

const dfnsUser = new NewUser();

const paymentService = new PaymentService(
  false //process.env.APP_USE_MOCK
).GetPaymentService();

export class TransferTransactionsController extends TransactionController {
  constructor() {
    super(Model);
  }

  private saveTransaction = async (
    transactionId: string,
    fromPeyyaId: string,
    toPeyyaId: string,
    message: string,
    amount: string,
    currency: "EURe"
  ) => {
    try {
      const transaction = new Transaction({
        from: fromPeyyaId,
        to: toPeyyaId,
        message: message,
        transactionId: transactionId,
        amount: amount,
        currency,
        date: new Date(),
      });
      await transaction.save();
    } catch (error) {
      throw error;
    }
  };

  /**
   * Init controller
   */
  public init = async (req, res, next) => {
    try {
      const { targetPhoneNumber, amount, message, currency } = req.body;
      const { peyyaUser } = req;

      const targetPeyyaUser = await this.getUserByPhone(targetPhoneNumber);
      const toWalletId = targetPeyyaUser.wallets[0].toString();
      const fromWalletId = peyyaUser.wallets[0].toString();
      const fromWallet: IWallet = await Wallet.findOne({ _id: fromWalletId });
      const toWallet: IWallet = await Wallet.findOne({ _id: toWalletId });

      const response: ITransaction = await dfnsUser.sendToPeyyaUser(
        fromWallet.displayAddress,
        toWallet.displayAddress,
        amount,
        currency || "EURe"
      );

      const newTransaction = await this.saveTransaction(
        response.id,
        peyyaUser._id || peyyaUser.id,
        targetPeyyaUser._id || targetPeyyaUser.id,
        message,
        amount,
        currency
      );

      res.send({
        status: "success",
        data: {
          transactionId: response.id,
          to: targetPeyyaUser._id || targetPeyyaUser.id,
          from: peyyaUser._id || peyyaUser.id,
          message,
          amount,
        },
      });
    } catch (error) {
      res.statusCode = Model.responses[ErrorStatuses.expectationFailed].status;
      res.send(Model.responses[ErrorStatuses.expectationFailed]);
    }
  };
}
