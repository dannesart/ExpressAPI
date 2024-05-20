import { Wallet } from "@/schema/wallet";
import {
  IWallet,
  WalletId,
  WalletResponse,
  WalletResponseStatus,
  WalletStatus,
} from "@/schema/wallet/wallet";
import { IWalletService } from "@/schema/wallet/service";
import { Utils } from "@/utils";
import { ethers } from "ethers";

export class PeyyaWalletService implements IWalletService {
  private __network = "ropsten";

  /**
   * Get ballance
   */
  private getBalance = async (address: string) => {
    try {
      const provider = ethers.getDefaultProvider(this.__network);
      const balance = await provider.getBalance(address);
      const balanceInEth = ethers.utils.formatEther(balance);
      return balanceInEth;
    } catch (error) {
      throw error;
    }
  };

  /**
   * Create a new wallet. This will be triggerd once a new user is registered.
   * Returns a new wallet including address, privatekey (not stored) and phrase (not stored).
   */
  public create = async (iban?: string, description?: string) => {
    /**
     * Generate a new wallet.
     */
    const { address, privateKey, mnemonic } = ethers.Wallet.createRandom();

    /**
     * Store the new wallet in db. NOT the privatekey and phrase. Since it's a non custodial wallet
     * Privatekey and pharse will be sent in respone. This will let user to take responsiblity of security.
     * So this will not be in any risk.
     */

    const wallet: IWallet = {
      address,
      displayAddress: "",
      description: description || "",
      id: Utils._uuid(),
      status: WalletStatus.success,
      iban: iban || "",
      publicKey: "",
    };

    /**
     * Db action
     */
    const newWallet = new Wallet(wallet);
    await newWallet.save();

    return {
      status: WalletResponseStatus.success,
      wallet: newWallet,
      privateKey,
      phrase: mnemonic.phrase,
    } as WalletResponse;
  };

  /**
   * Get wallet based on walletid
   * this will return infromation about the wallet, including wallet address.
   */
  public get = async (id: WalletId) => {
    try {
      const wallet: IWallet = await Wallet.findOne({ id });
      const balance = this.getBalance(wallet.address);
      return { status: WalletResponseStatus.success, wallet, balance };
    } catch (error) {
      throw error;
    }
  };

  /**
   * Delete current wallet.
   */
  public delete = async (id: WalletId) => {
    try {
      const wallet: IWallet = await Wallet.findOneAndDelete({ id });
      return { status: WalletResponseStatus.success, wallet };
    } catch (error) {
      throw error;
    }
  };

  /**
   * Update current wallet with further information.
   * This will not update the block chain wallet.
   * Wallet information in DB.
   */
  public update = async (id: WalletId, wallet: IWallet) => {
    try {
      const walletUpdate: IWallet = await Wallet.findOneAndUpdate(
        { id },
        wallet
      );
      return { status: WalletResponseStatus.success, wallet: walletUpdate };
    } catch (error) {
      throw error;
    }
  };
}
