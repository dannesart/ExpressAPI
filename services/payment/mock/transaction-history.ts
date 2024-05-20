import {
  ITransaction,
  TransactionResponseStatus,
  TransactionsResponse,
  TransactionStatus,
} from "@/schema/wallet/transaction";
import { Utils } from "@/utils";

const successTransaction: ITransaction = {
  id: Utils._uuid(),
  from: "",
  to: "",
  amount: "40",
  currency: "EUR",
  date: new Date(),
  status: TransactionStatus.success,
  message: "Thanks for the dinner",
  transactionId: "4234324",
};

const errorTransaction: ITransaction = {
  id: Utils._uuid(),
  from: "",
  to: "",
  amount: "20",
  currency: "EUR",
  date: new Date(),
  status: TransactionStatus.error,
  message: "Thanks for the dinner",
  transactionId: "4234324",
};

// TODO Create interface for movements / transaction history

export const GetTransactionHistoryMockResponse: TransactionsResponse = {
  status: TransactionResponseStatus.success,
  transactions: [successTransaction, errorTransaction],
};
