import { DfnsWalletService } from "@/services/wallet/dfns/wallet.service";
import { AxiosResponse } from "axios";

const dfns = new DfnsWalletService();

interface getBalanceResponse {
  id: string;
  assetSymbol: string;
  balance: string;
}

export class NewUser {
  constructor() {}

  public addressOfPeyyaUserId = async (peyyaUserId: string) => {
    try {
      const listOfAccounts = await dfns.listAccounts();

      for (let i = 0; i < listOfAccounts.items.length; i++) {
        if (peyyaUserId == listOfAccounts.items[i].name) {
          const address: string = listOfAccounts.items[i].id;
          return address;
        }
      }
      throw Error("ERROR: peyya user does not have an account");
    } catch (error) {
      throw error;
    }
  };

  public createUserWallet = async (peyyaUserId: string) => {
    try {
      const listOfAccounts = await dfns.listAccounts();

      for (let i = 0; i < listOfAccounts.items.length; i++) {
        if (peyyaUserId == listOfAccounts.items[i].name) {
          throw Error("ERROR: User with this peyyaId has account already");
        }
      }

      const wallet = await dfns.createAssetAccount("ETH", peyyaUserId, 5, 3);

      return wallet;
    } catch (error) {
      throw error;
    }
  };

  public topUpWallet = async (peyyaUserId: string, amount?: string) => {
    try {
      const receiver: string = await this.addressOfPeyyaUserId(peyyaUserId);

      const walletTopUp = await dfns.initiatePaymentToAssetAccount(
        "aa-montana-india-004d31eef9",
        amount || "0.01",
        receiver,
        "ETH",
        "wallet top up",
        `${peyyaUserId}`,
        "test"
      );

      return walletTopUp;
    } catch (error) {
      throw error;
    }
  };

  public sendToPeyyaUser = async (
    peyyaUserIdSender: string,
    peyyaUserIdReceiver: string,
    amount: string,
    message?: string
  ) => {
    try {
      const sender: string = await this.addressOfPeyyaUserId(peyyaUserIdSender);
      const receiver: string = await this.addressOfPeyyaUserId(
        peyyaUserIdReceiver
      );

      const tx = await dfns.initiatePaymentToAssetAccount(
        sender,
        amount,
        receiver,
        "ETH",
        message || "test tx",
        "test",
        "test"
      );

      return tx;
    } catch (error) {
      throw error;
    }
  };

  public getBalanceOfPeyyaUserId = async (peyyaUserId: string) => {
    try {
      const assetAccount: string = await this.addressOfPeyyaUserId(peyyaUserId);

      const balance: getBalanceResponse = await dfns.getBalance(assetAccount);

      return balance;
    } catch (error) {
      throw error;
    }
  };

  private handlePayments = async (payments, amount) => {
    const sorted = (payments || []).sort((a, b) => {
      const aDate = new Date(a.dateCreated).getTime();
      const bDate = new Date(b.dateCreated).getTime();
      return aDate > bDate ? -1 : 1;
    });
    return sorted;
  };

  public getPaymentsByPeyyaUserId = async (
    peyyaUserId: string,
    amount = 10
  ) => {
    try {
      const listOfAccounts = await dfns.listAccounts();

      for (let i = 0; i < listOfAccounts.items.length; i++) {
        if (peyyaUserId == listOfAccounts.items[i].name) {
          const account = listOfAccounts.items[i].id;
          const payments = await dfns.listPayments(account);
          const handled = await this.handlePayments(payments.items, amount);
          return handled;
        }
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}
