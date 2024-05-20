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
import { WalletAuth } from "./auth";
import { ApiClient } from "@/utils/client";
import { AxiosRequestConfig, AxiosResponse } from "axios";
require("dotenv").config();
import axios from "axios";
import {
  getBalanceResponse,
  listOfAccountResponse,
  getAssetAccountByIdResponse,
  createAssetAccountRequest,
  createAssetAccountResponse,
  createAssetAccountForPublicKeyRequest,
  createAssetAccountForPublicKeyResponse,
  initiatePaymentToAssetAccountRequest,
  initiatePaymentToAssetAccountResponse,
  initiatePaymentToBlockchainAddressRequest,
  initiatePaymentToBlockchainAddressResponse,
  listPaymentsResponse,
  paymentResponse,
  listPublicKeysResponse,
  publicKeyResponse,
  createPublicKeyRequest,
  createPublicKeyResponse,
  getAddressForNetworkResponse,
  broadcastTransactionRequest,
  broadcastTransactionResponse,
  broadcastContractCallRequest,
  broadcastContractCallResponse,
  getTransactionBroadcastByIdResponse,
  createSignatureRequest,
  createSignatureResponse,
  signatureByIdResponse,
  listAPIKeysResponse,
  APIKeyResponse,
} from "./schemas";

const api = new ApiClient();
const walletAuth = new WalletAuth();
const dfnsEndpoint = "https://api.dfns.ninja";

const myHeaders = {
  Authorization: `Bearer ${process.env.DFNS_BEARER_TOKEN_API_NINJA}`,
  "x-custom-rpc": `https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`,
};
const myHeadersEmployee = {
  Authorization: `Bearer ${process.env.DFNS_BEARER_TOKEN_EMPLOYEE_NINJA}`,
};

export class DfnsWalletServiceMumbai implements IWalletService {
  private __network = "ropsten";
  private __auth;
  /**
   * Init authorization
   */
  private initAuth = async () => {
    await walletAuth.init();
  };

  /**
   * Get ballance
   */
  public getBalance = async (accountId: string) => {
    try {
      // const balance = await api.get(
      //   `${process.env.DFNS_ENDPOINT}/assets/asset-accounts/${accountId}/balance`,
      //   {},
      //   myHeaders
      // );
      const config: AxiosRequestConfig = {
        method: "get",
        url: `${process.env.DFNS_ENDPOINT}/assets/asset-accounts/${accountId}/balance`,
        headers: myHeaders,
      };
      const response: AxiosResponse<getBalanceResponse> = await axios(config);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  /**
   * List Dfns asset accounts
   */
  public listAccounts = async () => {
    try {
      const response: AxiosResponse<listOfAccountResponse> = await api.get(
        `${process.env.DFNS_ENDPOINT}/assets/asset-accounts`,
        {},
        myHeaders
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  /**
   * Get information about an Asset Account based on Asset Account ID (example;'aa-word-word-hash')
   */
  public getAssetAccountByID = async (accountId: string) => {
    try {
      const response: AxiosResponse<getAssetAccountByIdResponse> =
        await api.get(
          `${process.env.DFNS_ENDPOINT}/assets/asset-accounts/${accountId}`,
          {},
          myHeaders
        );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  /**
   * Create an Asset Account
   */
  public createAssetAccount = async (
    assetSymbol: string,
    name: string,
    groupSize: number,
    groupThreshold: number
  ) => {
    try {
      // const response = await api.post(
      //   `${process.env.DFNS_ENDPOINT}/assets/asset-accounts`,
      //   {
      //     assetSymbol: assetSymbol,
      //     groupSize: groupSize,
      //     groupThreshold: groupThreshold,
      //     name: name,
      //   },
      //   myHeaders
      // );
      // return response;

      const data: createAssetAccountRequest = {
        assetSymbol: assetSymbol,
        groupSize: groupSize,
        groupThreshold: groupThreshold,
        name: name,
      };

      const config: AxiosRequestConfig = {
        method: "post",
        url: `${process.env.DFNS_ENDPOINT}/assets/asset-accounts`,
        headers: myHeaders,
        data: data,
      };

      const response: AxiosResponse<createAssetAccountResponse> = await axios(
        config
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  /**
   * Create an Asset Account for public key
   */
  public createAssetAccountForPublicKey = async (
    assetSymbol: string,
    name: string,
    groupSize: number,
    groupThreshold: number,
    publicKey: string
  ) => {
    try {
      // const response = await api.post(
      //   `${process.env.DFNS_ENDPOINT}/assets/asset-accounts`,
      //   {
      //     assetSymbol: assetSymbol,
      //     groupSize: groupSize,
      //     groupThreshold: groupThreshold,
      //     name: name,
      //     publicKey: publicKey,
      //   },
      //   myHeaders
      // );
      // return response;

      const data: createAssetAccountForPublicKeyRequest = {
        assetSymbol: assetSymbol,
        groupSize: groupSize,
        groupThreshold: groupThreshold,
        name: name,
        publicKey: publicKey,
      };

      const config: AxiosRequestConfig = {
        method: "post",
        url: `${process.env.DFNS_ENDPOINT}/assets/asset-accounts`,
        headers: myHeaders,
        data: data,
      };

      const response: AxiosResponse<createAssetAccountForPublicKeyResponse> =
        await axios(config);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  /**
   * Initate a payment from Asset Account to Asset Account
   */
  public initiatePaymentToAssetAccount = async (
    accountIdSender: string,
    amount: string,
    accountIdReveiver: string,
    assetSymbol: string,
    note: string,
    narrative: string,
    externalId: string
  ) => {
    try {
      // const response = await api.post(
      //   `${process.env.DFNS_ENDPOINT}/assets/asset-accounts/${accountIdSender}/payments`,
      //   {
      //     receiver: {
      //       kind: "DfnsAssetAccount",
      //       id: accountIdReveiver,
      //     },
      //     assetSymbol: assetSymbol,
      //     amount: amount,
      //     note: note,
      //     narrative: narrative,
      //     externalId: externalId,
      //   },
      //   myHeaders
      // );
      // return response;

      const data: initiatePaymentToAssetAccountRequest = {
        receiver: {
          kind: "DfnsAssetAccount",
          id: accountIdReveiver,
        },
        assetSymbol: assetSymbol,
        amount: amount,
        note: note,
        narrative: narrative,
        externalId: externalId,
      };

      const config: AxiosRequestConfig = {
        method: "post",
        url: `${process.env.DFNS_ENDPOINT}/assets/asset-accounts/${accountIdSender}/payments`,
        headers: myHeaders,
        data: data,
      };

      const response: AxiosResponse<initiatePaymentToAssetAccountResponse> =
        await axios(config);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  /**
   * Initate a payment from Asset Account to Blockchain Address
   */
  public initiatePaymentToBlockchainAddress = async (
    accountIdSender: string,
    amount: string,
    accountIdReveiver: string,
    assetSymbol: string,
    note: string,
    narrative: string,
    externalId: string
  ) => {
    try {
      // const response = await api.post(
      //   `${process.env.DFNS_ENDPOINT}/assets/asset-accounts/${accountIdSender}/payments`,
      //   {
      //     receiver: {
      //       kind: "BlockchainWalletAddress",
      //       address: accountIdReveiver,
      //     },
      //     assetSymbol: assetSymbol,
      //     amount: amount,
      //     note: note,
      //     narrative: narrative,
      //     externalId: externalId,
      //   },
      //   myHeaders
      // );
      // return response;

      const data: initiatePaymentToBlockchainAddressRequest = {
        receiver: {
          kind: "BlockchainWalletAddress",
          address: accountIdReveiver,
        },
        assetSymbol: assetSymbol,
        amount: amount,
        note: note,
        narrative: narrative,
        externalId: externalId,
      };

      const config: AxiosRequestConfig = {
        method: "post",
        url: `${process.env.DFNS_ENDPOINT}/assets/asset-accounts/${accountIdSender}/payments`,
        headers: myHeaders,
        data: data,
      };

      const response: AxiosResponse<initiatePaymentToBlockchainAddressResponse> =
        await axios(config);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  /**
   * List all payments of AccountId
   */
  public listPayments = async (accountId: string) => {
    try {
      // const response = await api.get(
      //   `${process.env.DFNS_ENDPOINT}/assets/asset-accounts/${accountId}/payments`,
      //   {},
      //   myHeaders
      // );
      const config: AxiosRequestConfig = {
        method: "get",
        url: `${process.env.DFNS_ENDPOINT}/assets/asset-accounts/${accountId}/payments`,
        headers: myHeaders,
      };

      const response: AxiosResponse<listPaymentsResponse> = await axios(config);
      return response.data;
      //return response;
    } catch (error) {
      throw error;
    }
  };

  /**
   * Get payment based on paymentId and account Id
   */
  public getPaymentById = async (accountId: string, paymentId: string) => {
    try {
      const response: AxiosResponse<paymentResponse> = await api.get(
        `${process.env.DFNS_ENDPOINT}/assets/asset-accounts/${accountId}/payments/${paymentId}`,
        {},
        myHeaders
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  /**
   * List Dfns public key accounts
   */
  public listPublicKeys = async () => {
    try {
      const response: AxiosResponse<listPublicKeysResponse> = await api.get(
        `${process.env.DFNS_ENDPOINT}/public-keys`,
        {},
        myHeaders
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  /**
   * Get Dfns public key accounts by Id
   */
  public readPublicKeyById = async (publicKeyId: string) => {
    try {
      const response: AxiosResponse<publicKeyResponse> = await api.get(
        `${process.env.DFNS_ENDPOINT}/mpc/public-keys/${publicKeyId}`,
        {},
        myHeaders
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  /**
   * Create Dfns public key account
   */
  public createPublicKey = async (
    Eddsa: boolean,
    groupSize: number,
    groupThreshold: number
  ) => {
    try {
      // const response = await api.post(
      //   `${process.env.DFNS_ENDPOINT}/public-keys`,
      //   {
      //     isEddsa: Eddsa,
      //     groupSize: groupSize,
      //     groupThreshold: groupThreshold,
      //   },
      //   myHeaders
      // );
      // return response;

      const data: createPublicKeyRequest = {
        isEddsa: Eddsa,
        groupSize: groupSize,
        groupThreshold: groupThreshold,
      };

      const config: AxiosRequestConfig = {
        method: "post",
        url: `${process.env.DFNS_ENDPOINT}/public-keys`,
        headers: myHeaders,
        data: data,
      };

      const response: AxiosResponse<createPublicKeyResponse> = await axios(
        config
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  /**
   * Get address of Dfns public key account for network
   */
  public getAddressForNetwork = async (publicKey: string, network: string) => {
    try {
      console.time("GetAddressForNetwork2");
      // const response: AxiosResponse<getAddressForNetworkResponse> =
      //   await api.get(
      //     `${process.env.DFNS_ENDPOINT}/public-keys/${publicKey}/address?network=${network}`,
      //     {
      //       publicKey: publicKey,
      //       network: network,
      //     },
      //     myHeaders
      //   );
      const response = await axios({
        method: "GET",
        url: `${process.env.DFNS_ENDPOINT}/public-keys/${publicKey}/address?network=${network}`,
        params: JSON.stringify({
          publicKey: publicKey,
          network: network,
        }),
        headers: myHeaders,
      });
      console.timeEnd("GetAddressForNetwork2");
      return response.data;
    } catch (error) {
      console.log("ERROR", error);
      throw error;
    }
  };

  /**
   * Broadcast Transaction for Dfns public key account to blockchain address (default gaslimit = 22000)
   */
  public broadcastTransaction = async (
    fromPublicKey: string,
    toAddress: string,
    value: string,
    network: string,
    gasLimit = "22000"
  ) => {
    try {
      // const response = await api.post(
      //   `${process.env.DFNS_ENDPOINT}/mpc/public-keys/transactions`,
      //   {
      //     publicKeyId: fromPublicKey,
      //     network: network,
      //     templateKind: "EvmGenericTx",
      //     value: value,
      //     gasLimit: gasLimit,
      //     to: toAddress,
      //   },
      //   myHeaders
      // );
      // return response;

      const data: broadcastTransactionRequest = {
        publicKeyId: fromPublicKey,
        network: network,
        templateKind: "EvmGenericTx",
        value: value,
        gasLimit: gasLimit,
        to: toAddress,
      };

      const config: AxiosRequestConfig = {
        method: "post",
        url: `${process.env.DFNS_ENDPOINT}/mpc/public-keys/transactions`,
        headers: myHeaders,
        data: data,
      };

      const response: AxiosResponse<broadcastTransactionResponse> = await axios(
        config
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  /**
   * Broadcast a call to a Smart Contract (default gas limit = "1000000")
   */
  public broadcastContractCall = async (
    fromPublicKey: string,
    toAddress: string,
    network: string,
    txdata: string,
    gasLimit = "1000000"
  ) => {
    try {
      // const response = await api.post(
      //   `${process.env.DFNS_ENDPOINT}/mpc/public-keys/transactions`,
      //   {
      //     publicKeyId: fromPublicKey,
      //     network: network,
      //     templateKind: "EvmGenericTx",
      //     data: data,
      //     gasLimit: gasLimit,
      //     to: toAddress,
      //   },
      //   myHeaders
      // );
      // return response;

      const data: broadcastContractCallRequest = {
        publicKeyId: fromPublicKey,
        network: network,
        templateKind: "EvmGenericTx",
        data: txdata,
        gasLimit: gasLimit,
        to: toAddress,
      };

      const config: AxiosRequestConfig = {
        method: "post",
        url: `${process.env.DFNS_ENDPOINT}/mpc/public-keys/transactions`,
        headers: myHeaders,
        data: data,
      };

      const response: AxiosResponse<broadcastContractCallResponse> =
        await axios(config);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  /**
   * Get transaction information by transaction Id
   */
  public getTransactionBroadcastById = async (txBroadCastId: string) => {
    try {
      const response: AxiosResponse<getTransactionBroadcastByIdResponse> =
        await api.get(
          `${process.env.DFNS_ENDPOINT}/mpc/public-keys/transactions/${txBroadCastId}`,
          {},
          myHeaders
        );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  /**
   * Create signature for hashed message based on PublicKeyId
   */
  public createSignature = async (publicKeyId: string, hash: string) => {
    try {
      // const response = await api.post(
      //   `${process.env.DFNS_ENDPOINT}/mpc/public-keys/${publicKeyId}/signatures`,
      //   {
      //     hash: hash,
      //   },
      //   myHeaders
      // );
      // return response;

      const data: createSignatureRequest = {
        hash: hash,
      };

      const config: AxiosRequestConfig = {
        method: "post",
        url: `${process.env.DFNS_ENDPOINT}/mpc/public-keys/${publicKeyId}/signatures`,
        headers: myHeaders,
        data: data,
      };

      const response: AxiosResponse<createSignatureResponse> = await axios(
        config
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  /**
   * Get signature by AccountId and SignatureId
   */
  public getSignatureById = async (
    publicKeyId: string,
    signatureId: string
  ) => {
    try {
      const response: AxiosResponse<signatureByIdResponse> = await api.get(
        `${process.env.DFNS_ENDPOINT}/mpc/public-keys/${publicKeyId}/signatures/${signatureId}`,
        {},
        myHeaders
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  /**
   * List all active API keys for Dfns
   */
  public listAPIKeys = async () => {
    try {
      const response: AxiosResponse<listAPIKeysResponse> = await api.get(
        `${process.env.DFNS_ENDPOINT}/api-keys`,
        {},
        myHeadersEmployee
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  /**
   * Get API key by Id
   */
  public getAPIKeyById = async (apiKeyId: string) => {
    try {
      const response: AxiosResponse<APIKeyResponse> = await api.get(
        `${process.env.DFNS_ENDPOINT}/api-keys/${apiKeyId}`,
        {},
        myHeadersEmployee
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  /**
   * List scopes for Dfns API keys / does not work in Ninja
   */
  public listScopesApiKeys = async () => {
    try {
      const response = await api.get(
        `${process.env.DFNS_ENDPOINT}/api-keys/scopes`,
        {},
        myHeaders
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  /**
   * Create a new wallet. This will be triggerd once a new user is registered.
   * Returns a new wallet including address, privatekey (not stored) and phrase (not stored).
   */
  public create = async (
    iban?: string,
    description?: string,
    phone?: string
  ) => {
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
