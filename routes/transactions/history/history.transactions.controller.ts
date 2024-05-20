/**
 * Libs
 */
import { ObjectId } from "mongodb";

/**
 * Controller
 */
import { TransactionController } from "@/controllers/transaction.controller";

/**
 * Model
 */
import Model from "./history.transactions.model";

/**
 * Schemas
 */
import { IUser } from "@/schema/user";

/**
 * Services
 */
import { PaymentService } from "@/services/payment/payment.service";
import { ErrorStatuses } from "@/vendor/errors";
import { NewUser } from "@/services/wallet/dfns/new.user.service";
import Transaction, { ITransaction } from "@/schema/wallet/transaction";
const dfnsUser = new NewUser();
const paymentService = new PaymentService(
  process.env.APP_USE_MOCK
).GetPaymentService();

export class HistoryTransactionsController extends TransactionController {
  constructor() {
    super(Model);
  }

  public init = async (req, res, next) => {
    try {
      const { peyyaUser } = req;
      if (!peyyaUser) {
        throw new Error("Missing peyya user");
      }
      const { id, _id } = peyyaUser;
      const { amount, sort } = req.query;

      const transactionHistory = await this.getTransactions(_id || id, amount);

      res.statusCode = 200;
      res.send({
        status: 200,
        message: "Transaction history",
        data: transactionHistory,
      });
    } catch (error) {
      res.statusCode = Model.responses[ErrorStatuses.expectationFailed].status;
      res.send(Model.responses[ErrorStatuses.expectationFailed]);
    }
  };

  private handleTransactionData = (response) => {
    const ethInEuro = 1630.52;
    response = response.data || response;
    return (response.items || []).map((item) => {
      return {
        ...item,
        amount:
          typeof item.amount === "string"
            ? Number(item.amount) * ethInEuro
            : item.amount * item.amount,
        assetSymbol: "EUR",
      };
    });
  };

  private getTransactions = async (peyyaUserId: string, amount: number) => {
    try {
      // const history = await dfnsUser.getPaymentsByPeyyaUserId(
      //   peyyaUserId,
      //   amount
      // );
      const peyyaObjectId = new ObjectId(peyyaUserId);
      try {
        const transactions: ITransaction[] = await Transaction.find()
          .or([{ from: peyyaObjectId }, { to: peyyaObjectId }])
          .sort({ date: -1 })
          .limit(Number(amount))
          .populate("from")
          .populate("to")
          .exec();
        return transactions || [];
      } catch (error) {
        return [];
      }
    } catch (error) {
      throw error;
    }
  };
}
