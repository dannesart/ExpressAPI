require("dotenv").config();
var axios = require("axios");

var dfnsEndpoint = "https://api.dfns.io";

var myHeaders = {
  Authorization: `Bearer ${process.env.DFNS_BEARER_TOKEN_API}`,
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
  return response.data;
}
async function getBalance(accountID) {
  var config = {
    method: "get",
    url: `${dfnsEndpoint}/assets/asset-accounts/${accountID}/balance`,
    headers: myHeaders,
  };

  const response = await axiosRequest(config);
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
async function initiatePaymentToAssetAccount(accountID, amount, reveiver) {
  var data = {
    receiver: {
      kind: "DfnsAssetAccount",
      id: reveiver,
    },
    assetSymbol: "ETH",
    amount: `${amount}`,
    note: "testing",
    narrative: "some payment",
    externalId: "1-2-3-4",
  };

  var config = {
    method: "post",
    url: `${dfnsEndpoint}/assets/asset-accounts/${accountID}/payments`,
    headers: myHeaders,
    data: data,
  };

  const response = await axiosRequest(config);
  console.log(response.data);
  return response.data;
}
async function initiatePaymentToBlockchainAddress(accountID, amount, reveiver) {
  var data = {
    receiver: {
      kind: "BlockchainWalletAddress",
      id: reveiver,
    },
    assetSymbol: "ETH",
    amount: `${amount}`,
    note: "testing",
    narrative: "some payment",
    externalId: "1-2-3-4",
  };

  var config = {
    method: "post",
    url: `${dfnsEndpoint}/assets/asset-accounts/${accountID}/payments`,
    headers: myHeaders,
    data: data,
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
async function createPublicKey() {
  var data = {
    isEddsa: true,
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
    Authorization: `Bearer ${process.env.DFNS_BEARER_TOKEN_EMPLOYEE}`,
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
    Authorization: `Bearer ${process.env.DFNS_BEARER_TOKEN_EMPLOYEE}`,
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
  var config = {
    method: "get",
    url: `${dfnsEndpoint}/api-keys/scopes`,
    headers: myHeaders,
  };

  const response = await axiosRequest(config);
  console.log(response.data);
  return response.data;
}
// createAssetAccount("jstest", 5, 3);

async function getBalanceAllAccounts() {
  const accountData = await listAccounts();

  for (var i = 0; i < accountData.items.length; i++) {
    console.log(accountData.items[i].id);
    const balance = await getBalance(accountData.items[i].id);
    console.log(balance);
  }
}

// aa-sierra-colorado-927c2e05ed - loaded with eth on goerli
// aa-colorado-nuts-48a205c5dc
// aa-carpet-alpha-64bf8a7344
// aa-football-alabama-8b0da16c27

// getAssetAccountByID("aa-colorado-nuts-48a205c5dc");
// getAssetAccountByID("aa-sierra-colorado-927c2e05ed");

// getBalance("aa-colorado-nuts-48a205c5dc");
// getBalance("aa-sierra-colorado-927c2e05ed");

// initiatePaymentToAssetAccount(
//   "aa-colorado-nuts-48a205c5dc",
//   0.001,
//   "aa-sierra-colorado-927c2e05ed"
// );

// initiatePaymentToBlockchainAddress(
//   "aa-colorado-nuts-48a205c5dc",
//   0.001,
//   "0xAC0A3a03Dd9368169109865a4F01890F3F7a0106"
// );

// createPublicKey();
// listPublicKeys();
// readPublicKey("pk-fifteen-mockingbird-5f9363ec8b");
// readPublicKey("pk-lima-robert-543bb7a142");

// createSignature("pk-fifteen-mockingbird-5f9363ec8b", "message");
// createSignature("pk-lima-robert-543bb7a142", "message");

// getSignatureById(
//   "pk-fifteen-mockingbird-5f9363ec8b",
//   "si-cardinal-iowa-0d2be5e339"
// );

// listAPIKeys();
// getAPIKey("api-nineteen-pennsylvania-42536de01c");
// listScopes();

getBalanceAllAccounts();
