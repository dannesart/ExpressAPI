require("dotenv").config();

var axios = require("axios");
var utils = require("crypto");
var ethers = require("ethers");

var dfnsEndpoint = "https://api.dfns.ninja";

var myHeaders = {
  Authorization: `Bearer ${process.env.DFNS_BEARER_TOKEN_API_NINJA}`,
};
async function axiosRequest(config) {
  return await axios(config);
}
async function listAccounts() {
  var config = {
    method: "get",
    url: `${dfnsEndpoint}/assets/asset-accounts`,
    headers: myHeaders,
  };

  const response = await axiosRequest(config);
  console.log(response.data);
  return response.data;
}
async function getBalance(accountID) {
  var config = {
    method: "get",
    url: `${dfnsEndpoint}/assets/asset-accounts/${accountID}/balance`,
    headers: myHeaders,
  };

  const response = await axiosRequest(config);
  console.log(response.data);
  return response.data;
}
async function getAssetAccountByID(accountID) {
  var config = {
    method: "get",
    url: `${dfnsEndpoint}/assets/asset-accounts/${accountID}`,
    headers: myHeaders,
  };

  const response = await axiosRequest(config);
  console.log(response.data);
  return response.data;
}
async function createAssetAccount(name, groupSize, groupThreshold) {
  var data = {
    assetSymbol: "ETH",
    groupSize: groupSize,
    groupThreshold: groupThreshold,
    name: name,
  };

  var config = {
    method: "post",
    url: `${dfnsEndpoint}/assets/asset-accounts`,
    headers: myHeaders,
    data: data,
  };

  const response = await axiosRequest(config);
  console.log(response.data);
  return response.data;
}
async function createAssetAccountForPublicKey(
  name,
  groupSize,
  groupThreshold,
  publicKey,
  assetSymbol
) {
  var data = {
    assetSymbol: assetSymbol,
    groupSize: groupSize,
    groupThreshold: groupThreshold,
    name: name,
    publicKey: publicKey,
  };

  var config = {
    method: "post",
    url: `${dfnsEndpoint}/assets/asset-accounts`,
    headers: myHeaders,
    data: data,
  };

  const response = await axiosRequest(config);
  console.log(response.data);
  return response.data;
}
async function initiatePaymentToAssetAccount(
  accountIdSender,
  amount,
  accountIdReveiver
) {
  var data = {
    receiver: {
      kind: "DfnsAssetAccount",
      id: accountIdReveiver,
    },
    assetSymbol: "ETH",
    amount: `${amount}`,
    note: "testing",
    narrative: "some payment",
    externalId: "1-2-3-4",
  };

  var config = {
    method: "post",
    url: `${dfnsEndpoint}/assets/asset-accounts/${accountIdSender}/payments`,
    headers: myHeaders,
    data: data,
  };

  const response = await axiosRequest(config);
  console.log(response.data);
  return response.data;
}
async function initiatePaymentToBlockchainAddress(
  accountIdSender,
  amount,
  accountIdReveiver
) {
  const data = {
    receiver: {
      kind: "BlockchainWalletAddress",
      address: accountIdReveiver,
    },
    assetSymbol: "ETH",
    amount: amount,
    note: "testing",
    narrative: "some payment",
    externalId: "1-2-3-4",
  };

  var config = {
    method: "post",
    url: `${dfnsEndpoint}/assets/asset-accounts/${accountIdSender}/payments`,
    headers: myHeaders,
    data: data,
  };

  const response = await axiosRequest(config);
  console.log(response.data);
  return response.data;
}
async function listPayments(accountID) {
  var config = {
    method: "get",
    url: `${dfnsEndpoint}/assets/asset-accounts/${accountID}/payments`,
    headers: myHeaders,
  };

  const response = await axiosRequest(config);
  console.log(response.data);

  console.log(response.data.items[0]);
  return response.data;
}
async function getPaymentById(accountID, paymentId) {
  var config = {
    method: "get",
    url: `${dfnsEndpoint}/assets/asset-accounts/${accountID}/payments/${paymentId}`,
    headers: myHeaders,
  };

  const response = await axiosRequest(config);
  console.log(response.data);
  return response.data;
}
async function listPublicKeys() {
  var config = {
    method: "get",
    url: `${dfnsEndpoint}/public-keys`,
    headers: myHeaders,
  };

  const response = await axiosRequest(config);
  console.log(response.data);
  return response.data;
}
async function readPublicKey(publicKeyId) {
  var config = {
    method: "get",
    url: `${dfnsEndpoint}/mpc/public-keys/${publicKeyId}`,
    headers: myHeaders,
  };

  const response = await axiosRequest(config);
  console.log(response.data);
  return response.data;
}
async function createPublicKey(Eddsa) {
  var data = {
    isEddsa: Eddsa,
    groupSize: 5,
    groupThreshold: 3,
  };

  var config = {
    method: "post",
    url: `${dfnsEndpoint}/public-keys`,
    headers: myHeaders,
    data: data,
  };

  const response = await axiosRequest(config);
  console.log(response.data);
  return response.data;
}
async function getAddressForNetwork(publicKey, network) {
  var data = {
    publicKey: publicKey,
    network: network,
  };

  var config = {
    method: "get",
    url: `${dfnsEndpoint}/public-keys/${publicKey}/address?network=${network}`,
    headers: myHeaders,
    data: data,
  };

  const response = await axiosRequest(config);
  console.log(response.data);
  return response.data;
}
async function BroadcastTransaction(fromPublicKey, toAddress, value, network) {
  var data = {
    publicKeyId: fromPublicKey,
    network: network,
    templateKind: "EvmGenericTx",
    value: value,
    gasLimit: "22000",
    to: toAddress,
  };

  var config = {
    method: "post",
    url: `${dfnsEndpoint}/mpc/public-keys/transactions`,
    headers: myHeaders,
    data: data,
  };

  const response = await axiosRequest(config);
  console.log(response.data);
  return response.data;
}
async function BroadcastContractCall(fromPublicKey, toAddress, data, network) {
  var data = {
    publicKeyId: fromPublicKey,
    network: network,
    templateKind: "EvmGenericTx",
    data: data,
    gasLimit: "1000000",
    to: toAddress,
  };

  var config = {
    method: "post",
    url: `${dfnsEndpoint}/mpc/public-keys/transactions`,
    headers: myHeaders,
    data: data,
  };

  const response = await axiosRequest(config);
  console.log(response.data);
  return response.data;
}
async function getTransactionBroadcast(txBroadCastId) {
  var config = {
    method: "get",
    url: `${dfnsEndpoint}/mpc/public-keys/transactions/${txBroadCastId}`,
    headers: myHeaders,
  };

  const response = await axiosRequest(config);
  console.log(response.data);
  return response.data;
}
async function createSignature(publicKeyId, hash) {
  var data = {
    hash: hash,
  };

  var config = {
    method: "post",
    url: `${dfnsEndpoint}/mpc/public-keys/${publicKeyId}/signatures`,
    headers: myHeaders,
    data: data,
  };

  const response = await axiosRequest(config);
  console.log(response.data);
  return response.data;
}
async function getSignatureById(publicKeyId, signatureId) {
  var config = {
    method: "get",
    url: `${dfnsEndpoint}/mpc/public-keys/${publicKeyId}/signatures/${signatureId}`,
    headers: myHeaders,
  };

  const response = await axiosRequest(config);
  console.log(response.data);
  return response.data;
}
async function listAPIKeys() {
  var myHeaders = {
    Authorization: `Bearer ${process.env.DFNS_BEARER_TOKEN_EMPLOYEE_NINJA}`,
  };

  var config = {
    method: "get",
    url: `${dfnsEndpoint}/api-keys`,
    headers: myHeaders,
  };

  const response = await axiosRequest(config);
  console.log(response.data);
  return response.data;
}
async function getAPIKey(apiKeyId) {
  var myHeaders = {
    Authorization: `Bearer ${process.env.DFNS_BEARER_TOKEN_EMPLOYEE_NINJA}`,
  };

  var config = {
    method: "get",
    url: `${dfnsEndpoint}/api-keys/${apiKeyId}`,
    headers: myHeaders,
  };

  const response = await axiosRequest(config);
  console.log(response.data);
  return response.data;
}
async function listScopes() {
  var myHeaders = {
    Authorization: `Bearer ${process.env.DFNS_BEARER_TOKEN_EMPLOYEE}`,
  };

  var config = {
    method: "get",
    url: `${dfnsEndpoint}/api-keys/scopes`,
    headers: myHeaders,
  };

  const response = await axiosRequest(config);
  console.log(response.data);
  return response.data;
}

async function getBalanceAllAccounts() {
  const accountData = await listAccounts();

  for (var i = 0; i < accountData.items.length; i++) {
    console.log(accountData.items[i].id);
    const balance = await getBalance(accountData.items[i].id);
    console.log(balance);
  }
}

async function getAddressForAllNetworks(publicKey) {
  const networkList = [
    // "ADA",
    "ALGO",
    "BTC",
    "DOGE",
    "DOT",
    "CFG",
    // "NEAR",
    "ETH",
    "ARB",
    "LTC",
    "KSM",
    // "XLM",
    "XRP",
    "ATOM",
    "MATIC",
    "XTZ",
    // "SOL",
    // "POLYX",
    "BNB",
  ];
  for (var i = 0; i < networkList.length; i++) {
    await getAddressForNetwork(publicKey, networkList[i]);
  }
}

async function signature() {
  const message = "I hereby declare that I am the address owner.";
  const hash = utils.createHash("sha256").update(message).digest("hex");
  const hash2 = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(message));

  console.log(hash);
  console.log(hash2);
  const signatureRS = await createSignature("pk-cat-tennis-94e4fdaeec", hash2);
  const signature = Buffer.from(
    `${signatureRS.r.replace("0x", "")}${signatureRS.s.replace("0x", "")}${
      signatureRS.recid
    }`,
    "hex"
  );
  console.log(signature, signature.length);
  console.log(signature.toString("hex"));
}

// signature();

// createAssetAccount("type", 5, 3);

// getAssetAccountByID("aa-equal-white-7d193115c0");
// getAssetAccountByID("aa-montana-india-004d31eef9");

// getBalance("aa-colorado-nuts-48a205c5dc");
// getBalance("aa-sierra-colorado-927c2e05ed");
// getBalance("aa-montana-india-004d31eef9");

// initiatePaymentToAssetAccount(
//   "aa-montana-india-004d31eef9",
//   0.001,
//   "aa-paris-cat-4710f50e68"
// );

// initiatePaymentToBlockchainAddress(
//   "aa-montana-india-004d31eef9",
//   "0.0003",
//   "0x14063a596f6E6AA28c1c281B90db98bA877848c5"
// );

// createPublicKey(false);
// listPublicKeys();
// readPublicKey("pk-california-butter-a387fbc156");
// readPublicKey("pk-lima-robert-543bb7a142");
// readPublicKey("pk-chicken-wyoming-83d3770136");

// getAddressForNetwork("pk-california-butter-a387fbc156", "MATIC");
// getAddressForNetwork("pk-cat-tennis-94e4fdaeec", "ADA");

// getAddressForAllNetworks("pk-california-butter-a387fbc156");

// getAddressForAllNetworks("pk-alanine-avocado-51445e49be");

// createAssetAccountForPublicKey(
//   "pkAccount",
//   5,
//   3,
//   "pk-whiskey-autumn-9237cd9b5b",
//   "BTC"
// );

// BroadcastTransaction(
//   "pk-california-butter-a387fbc156",
//   "0x14063a596f6E6AA28c1c281B90db98bA877848c5",
//   "0.1",
//   "ETH"
// );

// BroadcastContractCall(
//   "pk-california-butter-a387fbc156",
//   "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
//   "0xa9059cbb000000000000000000000000e01d1541e855a75403f8caff24c3b2a7e54fa41200000000000000000000000000000000000000000000000000071afd498d0000",
//   "ETH"
// );

// getTransactionBroadcast("tx-magnesium-michigan-c9410d05c6");

// createSignature(
//   "pk-california-butter-a387fbc156",
//   "ab530a13e45914982b79f9b7e3fba994cfd1f3fb22f71cea1afbf02b460c6d1d"
// );

// getSignatureById("pk-california-butter-a387fbc156", "si-rugby-echo-cfb43ef8d6");

listAPIKeys();
// getAPIKey("api-cola-grey-78eec37d8f");
// listScopes();

// getBalanceAllAccounts();

// listPayments("aa-bacon-ten-6790648375");
// console.log(data.items[0].receiver);
// getBalance("aa-bacon-ten-6790648375");

// getPaymentById("aa-montana-india-004d31eef9", "pa-fruit-vegan-8072f3501b");

// listAccounts();

// createAssetAccount("DemoAccount", 5, 3);
