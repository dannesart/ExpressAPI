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
require("dotenv").config();
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
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
};
const myHeadersEmployee = {
  Authorization: `Bearer ${process.env.DFNS_BEARER_TOKEN_EMPLOYEE_NINJA}`,
};

export class DfnsWalletService implements IWalletService {
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
      console.time("getBalance");
      const response: AxiosResponse<getBalanceResponse> = await axios(config);
      console.timeEnd("getBalance");
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
      console.time("listAccounts");
      const response: AxiosResponse<listOfAccountResponse> = await api.get(
        `${process.env.DFNS_ENDPOINT}/assets/asset-accounts`,
        {},
        myHeaders
      );
      console.timeEnd("listAccounts");
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
      console.time("getAssetAccountByID");
      const response: AxiosResponse<getAssetAccountByIdResponse> =
        await api.get(
          `${process.env.DFNS_ENDPOINT}/assets/asset-accounts/${accountId}`,
          {},
          myHeaders
        );
      console.timeEnd("getAssetAccountByID");
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
      console.time("createAssetAccount");
      const response: AxiosResponse<createAssetAccountResponse> = await axios(
        config
      );
      console.timeEnd("createAssetAccount");
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
      console.time("createAssetAccountForPublicKey");
      const response: AxiosResponse<createAssetAccountForPublicKeyResponse> =
        await axios(config);
      console.timeEnd("createAssetAccountForPublicKey");
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
      console.time("initiatePaymentToAssetAccount");
      const response: AxiosResponse<initiatePaymentToAssetAccountResponse> =
        await axios(config);
      console.timeEnd("initiatePaymentToAssetAccount");
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
      console.time("initiatePaymentToBlockchainAddress");
      const response: AxiosResponse<initiatePaymentToBlockchainAddressResponse> =
        await axios(config);
      console.timeEnd("initiatePaymentToBlockchainAddress");
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
      console.time("listPayments");
      const response: AxiosResponse<listPaymentsResponse> = await axios(config);
      console.timeEnd("listPayments");
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
      console.time("getPaymentById");
      const response: AxiosResponse<paymentResponse> = await api.get(
        `${process.env.DFNS_ENDPOINT}/assets/asset-accounts/${accountId}/payments/${paymentId}`,
        {},
        myHeaders
      );
      console.timeEnd("getPaymentById");
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
      console.time("listPublicKeys");
      const response: AxiosResponse<listPublicKeysResponse> = await api.get(
        `${process.env.DFNS_ENDPOINT}/public-keys`,
        {},
        myHeaders
      );
      console.timeEnd("listPublicKeys");
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
      console.time("readPublicKeyById");
      const response: AxiosResponse<publicKeyResponse> = await api.get(
        `${process.env.DFNS_ENDPOINT}/mpc/public-keys/${publicKeyId}`,
        {},
        myHeaders
      );
      console.timeEnd("readPublicKeyById");
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
      console.time("createPublicKey");
      const response: AxiosResponse<createPublicKeyResponse> = await axios(
        config
      );
      console.timeEnd("createPublicKey");
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
      console.time("getAddressForNetwork");
      const response: AxiosResponse<getAddressForNetworkResponse> =
        await api.get(
          `${process.env.DFNS_ENDPOINT}/public-keys/${publicKey}/address?network=${network}`,
          {
            publicKey: publicKey,
            network: network,
          },
          myHeaders
        );
      console.timeEnd("getAddressForNetwork");
      return response.data;
    } catch (error) {
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
      console.time("broadcastTransaction");
      const response: AxiosResponse<broadcastTransactionResponse> = await axios(
        config
      );
      console.timeEnd("broadcastTransaction");
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
      console.time("broadcastContractCall");
      const response: AxiosResponse<broadcastContractCallResponse> =
        await axios(config);
      console.timeEnd("broadcastContractCall");
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
      console.time("getTransactionBroadcastById");
      const response: AxiosResponse<getTransactionBroadcastByIdResponse> =
        await api.get(
          `${process.env.DFNS_ENDPOINT}/mpc/public-keys/transactions/${txBroadCastId}`,
          {},
          myHeaders
        );
      console.timeEnd("getTransactionBroadcastById");
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
      console.time("createSignature");
      const response: AxiosResponse<createSignatureResponse> = await axios(
        config
      );
      console.timeEnd("createSignature");
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
      console.time("getSignatureById");
      const response: AxiosResponse<signatureByIdResponse> = await api.get(
        `${process.env.DFNS_ENDPOINT}/mpc/public-keys/${publicKeyId}/signatures/${signatureId}`,
        {},
        myHeaders
      );
      console.timeEnd("getSignatureById");
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
      console.time("listAPIKeys");
      const response: AxiosResponse<listAPIKeysResponse> = await api.get(
        `${process.env.DFNS_ENDPOINT}/api-keys`,
        {},
        myHeadersEmployee
      );
      console.timeEnd("listAPIKeys");
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
      console.time("getAPIKeyById");
      const response: AxiosResponse<APIKeyResponse> = await api.get(
        `${process.env.DFNS_ENDPOINT}/api-keys/${apiKeyId}`,
        {},
        myHeadersEmployee
      );
      console.timeEnd("getAPIKeyById");
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
      console.time("listScopesApiKeys");
      const response = await api.get(
        `${process.env.DFNS_ENDPOINT}/api-keys/scopes`,
        {},
        myHeaders
      );
      console.timeEnd("listScopesApiKeys");
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
