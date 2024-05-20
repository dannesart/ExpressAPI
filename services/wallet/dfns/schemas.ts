export enum TransactionStatus {
  executed = "Executed",
  pending = "Pending",
}

export enum TransactionResponseStatus {
  success = "success",
  error = "error",
  pending = "pending",
}

export interface ITransactionAssetAccount {
  amount: number;
  assetAccountId: string;
  assetSymbol: string;
  dateCreated: string;
  externalId: string;
  id: string;
  initiator: {
    piKeyId: string;
    kind: string;
    orgId: string;
  };
  narrative: string;
  note: string;
  orgId: string;
  receiver: {
    kind: string;
    id: string;
  };
  receiverAddress: string;
  status: TransactionStatus;
  txHash: string;
}

export interface ITransaction {
  transaction: {
    publicKeyId: string;
    network: string;
    templateKind: string;
    data: string;
    gasLimit: string;
    to: string;
  };
  snapshot: string;
  dateUpdated: string;
  initiator: {
    kind: string;
    apiKeyId: string;
    orgId: string;
  };
  orgId: string;
  publicKeyId: string;
  network: string;
  status: string;
  id: string;
  dateCreated: string;
}

export interface getBalanceResponse {
  id: string;
  assetSymbol: string;
  balance: string;
}

export interface listOfAccountItem {
  assetSymbol: string;
  dateCreated: string;
  address: string;
  dateUpdate: string;
  name: string;
  groupSize: number;
  groupThreshold: number;
  id: string;
  publicKey: string;
  orgId: string;
  status: string;
  tags?: any[];
}

export interface listOfAccountResponse {
  items: listOfAccountItem[];
}

export interface getAssetAccountByIdResponse {
  assetSymbol: string;
  dateCreated: string;
  address: string;
  dateUpdate: string;
  name: string;
  groupSize: number;
  groupThreshold: number;
  id: string;
  publicKey: string;
  orgId: string;
  status: string;
  tags: any[];
}

export interface createAssetAccountRequest {
  assetSymbol: string;
  groupSize: number;
  groupThreshold: number;
  name: string;
}

export interface createAssetAccountResponse {
  id: string;
  orgId: string;
  status: string;
  assetSymbol: string;
  name: string;
  groupSize: number;
  groupThreshold: number;
  dateCreated: string;
  dateUpdate: string;
}

export interface createAssetAccountForPublicKeyRequest {
  assetSymbol: string;
  groupSize: number;
  groupThreshold: number;
  name: string;
  publicKey: string;
}

export interface createAssetAccountForPublicKeyResponse {
  assetSymbol: string;
  dateCreated: string;
  address: string;
  dateUpdate: string;
  name: string;
  groupSize: number;
  groupThreshold: number;
  id: string;
  publicKey: string;
  orgId: string;
  status: string;
  tags: any[];
}

export interface initiatePaymentToAssetAccountRequest {
  receiver: {
    kind: string;
    id: string;
  };
  assetSymbol: string;
  amount: string;
  note: string;
  narrative: string;
  externalId: string;
}

export interface initiatePaymentToAssetAccountResponse {
  receiver: { kind: string; id: string };
  assetSymbol: string;
  amount: string;
  note: string;
  narrative: string;
  externalId: string;
  assetAccountId: string;
  initiator: {
    kind: string;
    apiKeyId: string;
    orgId: string;
  };
  status: string;
  dateCreated: string;
  orgId: string;
  receiverAddress: string;
  id: string;
}

export interface initiatePaymentToBlockchainAddressRequest {
  receiver: {
    kind: string;
    address: string;
  };
  assetSymbol: string;
  amount: string;
  note: string;
  narrative: string;
  externalId: string;
}

export interface initiatePaymentToBlockchainAddressResponse {
  receiver: {
    kind: string;
    address: string;
  };
  assetSymbol: string;
  amount: string;
  note: string;
  narrative: string;
  externalId: string;
  assetAccountId: string;
  initiator: {
    kind: string;
    apiKeyId: string;
    orgId: string;
  };
  status: string;
  dateCreated: string;
  orgId: string;
  receiverAddress: string;
  id: string;
}

export interface paymentResponse {
  amount: string;
  assetAccountId: string;
  assetSymbol: string;
  dateCreated: string;
  externalId: string;
  id: string;
  initiator: {
    apiKeyId: string;
    kind: string;
    orgId: string;
  };
  narrative: string;
  note: string;
  orgId: string;
  receiver: {
    kind: string;
    id: string;
  };
  receiverAddress: string;
  status: string;
  txHash: string;
}

export interface listPaymentsResponse {
  items: paymentResponse[];
}

export interface publicKeyResponse {
  isEddsa: boolean;
  publicKey: string;
  allowedProducts: any[];
  groupSize: number;
  id: string;
  groupThreshold: number;
}

export interface listPublicKeysResponse {
  items: publicKeyResponse[];
}

export interface createPublicKeyRequest {
  isEddsa: boolean;
  groupSize: number;
  groupThreshold: number;
}

export interface createPublicKeyResponse {
  id: string;
  publicKey: string;
  groupSize: number;
  groupThreshold: number;
}

export interface getAddressForNetworkResponse {
  publicKeyId: string;
  network: string;
  address: string;
}

export interface broadcastTransactionRequest {
  publicKeyId: string;
  network: string;
  templateKind: string;
  value: string;
  gasLimit: string;
  to: string;
}

export interface broadcastTransactionResponse {
  transaction: {
    publicKeyId: string;
    network: string;
    templateKind: string;
    value: string;
    gasLimit: string;
    to: string;
  };
  snapshot: string;
  dateUpdated: string;
  initiator: {
    kind: string;
    apiKeyId: string;
    orgId: string;
  };
  orgId: string;
  publicKeyId: string;
  network: string;
  status: string;
  id: string;
  dateCreated: string;
}

export interface broadcastContractCallRequest {
  publicKeyId: string;
  network: string;
  templateKind: string;
  data: string;
  gasLimit: string;
  to: string;
}

export interface broadcastContractCallResponse {
  transaction: {
    publicKeyId: string;
    network: string;
    templateKind: string;
    data: string;
    gasLimit: string;
    to: string;
  };
  snapshot: string;
  dateUpdated: string;
  initiator: {
    kind: string;
    apiKeyId: string;
    orgId: string;
  };
  orgId: string;
  publicKeyId: string;
  network: string;
  status: string;
  id: string;
  dateCreated: string;
}

export interface getTransactionBroadcastByIdResponse {
  dateBroadcasted: string;
  dateCreated: string;
  dateUpdated: string;
  id: string;
  initiator: {
    apiKeyId: string;
    kind: string;
    orgId: string;
  };
  network: string;
  networkResponse: {
    walletId: string;
    tx: string;
    response: object;
  };
  orgId: string;
  publicKeyId: string;
  snapshot: string;
  status: string;
  transaction: {
    templateKind: string;
    gasLimit: string;
    to: string;
    data: string;
    publicKeyId: string;
    network: string;
  };
  txHash: string;
}

export interface createSignatureRequest {
  hash: string;
}

export interface createSignatureResponse {
  dateCreated: string;
  hash: string;
  id: string;
  initiator: {
    kind: string;
    orgId: string;
    employeeId: string;
  };
  orgId: string;
  publicKeyId: string;
  r: string;
  recid: number;
  s: string;
  status: string;
}

export interface signatureByIdResponse {
  dateCreated: string;
  hash: string;
  id: string;
  initiator: {
    kind: string;
    orgId: string;
    employeeId: string;
  };
  orgId: string;
  publicKeyId: string;
  r: string;
  recid: number;
  s: string;
  status: string;
}

export interface APIKeyResponse {
  dateCreated: string;
  name: string;
  scopes: any[];
  id: string;
  authorId: string;
  orgId: string;
  status: string;
}

export interface listAPIKeysResponse {
  items: APIKeyResponse[];
}
