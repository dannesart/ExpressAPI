import { DfnsWalletServiceMumbai } from "@/services/wallet/dfns/mumbai.wallet.service";
import { AxiosResponse } from "axios";

import { ethers } from "ethers";
require("dotenv").config();

const dfns = new DfnsWalletServiceMumbai();

const provider = new ethers.providers.JsonRpcProvider(
  `https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`
);

const ERC20_ABI = [
  "function transfer(address dst, uint rawAmount) external returns (bool)",
  "function balanceOf(address) view returns (uint)",
];

const addressEURe = "0xCF487EFd00B70EaC8C28C654356Fb0E387E66D62";
const contractEURe = new ethers.Contract(addressEURe, ERC20_ABI, provider);

const addressUSDe = "0xcCA6b920eebFf5343cCCf386909Ec2D8Ba802bdd";
const contractUSDe = new ethers.Contract(addressUSDe, ERC20_ABI, provider);

interface txData {
  data?: string;
  to?: string;
}

interface formattedBalance {
  EURe: string;
  USDe: string;
}

export class NewUser {
  constructor() {}

  public addressOfPeyyaUserId = async (publicKey: string) => {
    try {
      const addressResponse = await dfns.getAddressForNetwork(
        publicKey,
        "MATIC"
      );
      return addressResponse.address;
    } catch (error) {
      throw error;
    }
  };

  public createUserWallet = async () => {
    try {
      //Some check to see if the user already has an account
      const wallet = await dfns.createPublicKey(false, 5, 3);
      return wallet;
    } catch (error) {
      throw error;
    }
  };

  public topUpWallet = async (publicKeyReceiver: string) => {
    try {
      const receiver = await this.addressOfPeyyaUserId(publicKeyReceiver);
      const walletTopUpMatic = await dfns.broadcastTransaction(
        "pk-california-butter-a387fbc156",
        receiver,
        "0.01",
        "MATIC"
      );

      const walletTopUpEURe = await this.sendToPeyyaUser(
        "pk-california-butter-a387fbc156",
        publicKeyReceiver,
        "100",
        "EURe"
      );

      const walletTopUpUSDe = await this.sendToPeyyaUser(
        "pk-california-butter-a387fbc156",
        publicKeyReceiver,
        "100",
        "USDe"
      );

      return [walletTopUpMatic, walletTopUpEURe, walletTopUpUSDe];
    } catch (error) {
      throw error;
    }
  };

  private txDataEURe = async (addressReceiver: string, amount: string) => {
    try {
      const tx: txData = await contractEURe.populateTransaction.transfer(
        `${addressReceiver}`,
        ethers.utils.parseEther(`${amount}`)
      );
      return tx;
    } catch (error) {
      throw error;
    }
  };

  private txDataUSDe = async (addressReceiver: string, amount: string) => {
    try {
      const tx: txData = await contractUSDe.populateTransaction.transfer(
        `${addressReceiver}`,
        ethers.utils.parseEther(`${amount}`)
      );
      return tx;
    } catch (error) {
      throw error;
    }
  };

  public sendToPeyyaUser = async (
    publicKeySender: string,
    publicKeyReceiver: string,
    amount: string,
    currency: string
  ) => {
    try {
      const receiverAddress: string = await this.addressOfPeyyaUserId(
        publicKeyReceiver
      );
      switch (currency) {
        case "EURe":
          const txDataEURe: txData = await this.txDataEURe(
            receiverAddress,
            amount
          );
          const txEURe = await dfns.broadcastContractCall(
            publicKeySender,
            txDataEURe.to,
            "MATIC",
            txDataEURe.data
          );
          return txEURe;
        case "USDe":
          const txDataUSDe: txData = await this.txDataUSDe(
            receiverAddress,
            amount
          );
          const txUSDe = await dfns.broadcastContractCall(
            publicKeySender,
            txDataUSDe.to,
            "MATIC",
            txDataUSDe.data
          );
          return txUSDe;
        default:
          throw new Error(`${currency} - currency not allowed`);
      }
    } catch (error) {
      throw error;
    }
  };

  public getBalanceOfPeyyaUserId = async (publicKey: string) => {
    try {
      const address: string = await this.addressOfPeyyaUserId(publicKey);

      console.time("Get balance of eur");
      const balanceEURe: number = await contractEURe.balanceOf(address);
      const formattedEURe: string = ethers.utils.formatEther(balanceEURe);
      console.timeEnd("Get balance of eur");

      console.time("Get balance of usd");
      const balanceUSDe: number = await contractUSDe.balanceOf(address);
      const formattedUSDe: string = ethers.utils.formatEther(balanceUSDe);
      console.timeEnd("Get balance of usd");

      const formattedBalance: formattedBalance = {
        EURe: formattedEURe,
        USDe: formattedUSDe,
      };

      return formattedBalance;
    } catch (error) {
      throw error;
    }
  };
}
