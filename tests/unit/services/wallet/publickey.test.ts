import { DfnsWalletService } from "@/services/wallet/dfns/wallet.service";
import { string } from "joi";
require("dotenv").config();

const walletService = new DfnsWalletService();
jest.setTimeout(30000);

describe("Create instance of DfnsWalletService", () => {
  it("With no accountId we should be getting an error", async () => {
    const accountId = "";
    const getBalance: Promise<any> = walletService.getBalance(accountId);

    await expect(getBalance).rejects.toThrowError();
  });

  it("With an accountId we should be able to get balance", async () => {
    // Correct formated
    const accountId = "aa-montana-india-004d31eef9";
    const balance = await walletService.getBalance(accountId);

    expect(balance).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        assetSymbol: expect.any(String),
        balance: expect.any(String),
      })
    );
  });

  it("With listAccount we should be able to get list of all asset accounts", async () => {
    // Correct formated
    const listOfAccounts = await walletService.listAccounts();
    expect(listOfAccounts).toHaveProperty("items");
  });

  it("With accountId we should be able to get asset account", async () => {
    // Correct formated
    const accountId = "aa-montana-india-004d31eef9";
    const accountById = await walletService.getAssetAccountByID(accountId);

    expect(accountById).toEqual(
      expect.objectContaining({
        assetSymbol: expect.any(String),
        dateCreated: expect.any(String),
        address: expect.any(String),
        dateUpdate: expect.any(String),
        groupSize: expect.any(Number),
        groupThreshold: expect.any(Number),
        id: expect.any(String),
        publicKey: expect.any(String),
        orgId: expect.any(String),
        status: expect.any(String),
      })
    );
  });

  // it("With valid inputs we should be able to create new asset account", async () => {
  //   // Correct formated
  //   const assetSymbol = "ETH";
  //   const name = "TestScript";
  //   const groupsize: number = 5;
  //   const groupThreshold: number = 3;

  //   const newAssetAccount = await walletService.createAssetAccount(assetSymbol, name, groupsize, groupThreshold);

  //   expect(newAssetAccount).toMatchObject({
  //     status: 200,
  //   });
  // });

  // it("With valid inputs we should be able to create new asset account tied to a public key", async () => {
  //   // Correct formated
  //   const assetSymbol = "BNB";
  //   const name = "TestScript";
  //   const groupsize: number = 5;
  //   const groupThreshold: number = 3;
  //   const publicKey = "pk-whiskey-autumn-9237cd9b5b";

  //   const newAssetAccount = await walletService.createAssetAccountForPublicKey(assetSymbol, name, groupsize, groupThreshold, publicKey);

  //   expect(newAssetAccount).toMatchObject({
  //     status: 200,
  //   });
  // });

  // it("With valid inputs we should be able to send payment from asset account to asset account", async () => {
  //   // Correct formated
  //   const accountIdSender = "aa-montana-india-004d31eef9";
  //   const amount = "0.0001";
  //   const accountIdReveiver = "aa-paris-cat-4710f50e68";
  //   const assetSymbol = "ETH"
  //   const note = "testing";
  //   const narrative = "some payment";
  //   const externalId = "1-2-3-4";

  //   const newAssetAccount = await walletService.initiatePaymentToAssetAccount(
  //     accountIdSender,
  //     amount,
  //     accountIdReveiver,
  //     assetSymbol,
  //     note,
  //     narrative,
  //     externalId
  //   );

  //   expect(newAssetAccount).toMatchObject({
  //     status: 200,
  //   });
  // });

  // it("With valid inputs we should be able to send payment from asset account to blockchain address", async () => {
  //   // Correct formated
  //   const accountIdSender = "aa-montana-india-004d31eef9";
  //   const amount = "0.0008";
  //   const accountIdReveiver = "0x14063a596f6E6AA28c1c281B90db98bA877848c5";
  //   const assetSymbol = "ETH"
  //   const note = "testing";
  //   const narrative = "some payment";
  //   const externalId = "1-2-3-4";

  //   const newAssetAccount = await walletService.initiatePaymentToBlockchainAddress(
  //     accountIdSender,
  //     amount,
  //     accountIdReveiver,
  //     assetSymbol,
  //     note,
  //     narrative,
  //     externalId
  //   );

  //   expect(newAssetAccount).toMatchObject({
  //     status: 200,
  //   });
  // });

  it("With listPayments we should be able to get list of payment by accountId", async () => {
    // Correct formated
    const accountId = "aa-montana-india-004d31eef9";
    const listOfPayments = await walletService.listPayments(accountId);

    expect(listOfPayments).toHaveProperty("items");
  });

  it("With invalid accountId we should be getting an error for listPayments", async () => {
    // If empty string is provided it will call all asset accounts
    const accountId = "a";
    const accountById: Promise<any> =
      walletService.getAssetAccountByID(accountId);

    await expect(accountById).rejects.toThrowError();
  });

  it("With accountId && paymentId we should be able to get payment of accountId + paymentId", async () => {
    // Correct formated
    const accountId = "aa-montana-india-004d31eef9";
    const paymentId = "pa-fruit-vegan-8072f3501b";
    const payment = await walletService.getPaymentById(accountId, paymentId);

    expect(payment).toEqual(
      expect.objectContaining({
        amount: expect.any(String),
        assetAccountId: expect.any(String),
        assetSymbol: expect.any(String),
        dateCreated: expect.any(String),
        externalId: expect.any(String),
        id: expect.any(String),
        initiator: expect.any(Object),
        narrative: expect.any(String),
        note: expect.any(String),
        orgId: expect.any(String),
        receiver: expect.any(Object),
        receiverAddress: expect.any(String),
        status: expect.any(String),
        txHash: expect.any(String),
      })
    );
  });

  it("With invalid accountId we should be getting an error for getPaymentById", async () => {
    const accountId = "a";
    const paymentId = "pa-fruit-vegan-8072f3501b";
    const accountById: Promise<any> = walletService.getPaymentById(
      accountId,
      paymentId
    );

    await expect(accountById).rejects.toThrowError();
  });

  it("With invalid accountId we should be getting an error for getPaymentById", async () => {
    const accountId = "aa-montana-india-004d31eef9";
    const paymentId = "pa";
    const accountById: Promise<any> = walletService.getPaymentById(
      accountId,
      paymentId
    );

    await expect(accountById).rejects.toThrowError();
  });

  it("With listPublicKeys we should be able to get list of PublicKeys", async () => {
    // Correct formated
    const listOfPublicKeys = await walletService.listPublicKeys();

    expect(listOfPublicKeys).toHaveProperty("items");
  });

  it("With publicKey we should be able to get publicKey account", async () => {
    // Correct formated
    const publicKeyId = "pk-california-butter-a387fbc156";
    const publicKeyResponse = await walletService.readPublicKeyById(
      publicKeyId
    );

    expect(publicKeyResponse).toEqual(
      expect.objectContaining({
        isEddsa: expect.any(Boolean),
        publicKey: expect.any(String),
        allowedProducts: expect.any(Array),
        groupSize: expect.any(Number),
        id: expect.any(String),
        groupThreshold: expect.any(Number),
      })
    );
  });

  it("With invalid publicKey we should be getting an error for readPublicKeyById", async () => {
    const publicKey = "pk";
    const accountById: Promise<any> =
      walletService.readPublicKeyById(publicKey);

    await expect(accountById).rejects.toThrowError();
  });

  // it("With valid input we should be able to create publicKey account", async () => {
  //   // Correct formated
  //   const eddsa = true;
  //   const groupSize = 5;
  //   const groupThreshold = 3;
  //   const payment = await walletService.createPublicKey(eddsa, groupSize, groupThreshold);

  //   expect(payment).toMatchObject({
  //     status: 200,
  //   });
  // });

  it("With publicKey && network we should be able to get address for network", async () => {
    // Correct formated
    const publicKey = "pk-california-butter-a387fbc156";
    const network = "ETH";
    const addressResponse = await walletService.getAddressForNetwork(
      publicKey,
      network
    );

    expect(addressResponse).toEqual(
      expect.objectContaining({
        publicKeyId: expect.any(String),
        network: expect.any(String),
        address: expect.any(String),
      })
    );
  });

  it("With invalid publicKey we should be getting an error for getAddressForNetwork", async () => {
    const publicKey = "pk";
    const network = "ETH";
    const accountById: Promise<any> = walletService.getAddressForNetwork(
      publicKey,
      network
    );

    await expect(accountById).rejects.toThrowError();
  });

  it("With invalid network we should be getting an error for getAddressForNetwork", async () => {
    const publicKey = "pk-california-butter-a387fbc156";
    const network = "";
    const accountById: Promise<any> = walletService.getAddressForNetwork(
      publicKey,
      network
    );

    await expect(accountById).rejects.toThrowError();
  });

  it("With valid input we should be able to get broadcast transaction", async () => {
    // Correct formated
    const fromPublicKey = "pk-california-butter-a387fbc156";
    const toAddress = "0x14063a596f6E6AA28c1c281B90db98bA877848c5";
    const value = "0.001";
    const network = "ETH";
    const gasLimit = "22000";

    const broadcastResponse = await walletService.broadcastTransaction(
      fromPublicKey,
      toAddress,
      value,
      network,
      gasLimit
    );

    expect(broadcastResponse).toEqual(
      expect.objectContaining({
        transaction: expect.any(Object),
        snapshot: expect.any(String),
        dateUpdated: expect.any(String),
        initiator: expect.any(Object),
        orgId: expect.any(String),
        publicKeyId: expect.any(String),
        network: expect.any(String),
        status: expect.any(String),
        id: expect.any(String),
        dateCreated: expect.any(String),
      })
    );
  });

  it("With valid input we should be able to broadcast smart contract transaction", async () => {
    // Correct formated
    const fromPublicKey = "pk-california-butter-a387fbc156";
    const toAddress = "0x14063a596f6E6AA28c1c281B90db98bA877848c5";
    const network = "ETH";
    const data =
      "0xa9059cbb000000000000000000000000e01d1541e855a75403f8caff24c3b2a7e54fa41200000000000000000000000000000000000000000000000000071afd498d0000";
    const gasLimit = "1000000";

    const broadcastContractCallResponse =
      await walletService.broadcastContractCall(
        fromPublicKey,
        toAddress,
        network,
        data,
        gasLimit
      );

    expect(broadcastContractCallResponse).toEqual(
      expect.objectContaining({
        transaction: expect.any(Object),
        snapshot: expect.any(String),
        dateUpdated: expect.any(String),
        initiator: expect.any(Object),
        orgId: expect.any(String),
        publicKeyId: expect.any(String),
        network: expect.any(String),
        status: expect.any(String),
        id: expect.any(String),
        dateCreated: expect.any(String),
      })
    );
  });

  it("With txBroadCastId we should be able to get transaction element", async () => {
    // Correct formated
    const txBroadCastId = "tx-network-oscar-2855be5a67";
    const txId = await walletService.getTransactionBroadcastById(txBroadCastId);

    expect(txId).toEqual(
      expect.objectContaining({
        dateBroadcasted: expect.any(String),
        dateCreated: expect.any(String),
        dateUpdated: expect.any(String),
        id: expect.any(String),
        initiator: expect.any(Object),
        network: expect.any(String),
        networkResponse: expect.any(Object),
        orgId: expect.any(String),
        publicKeyId: expect.any(String),
        snapshot: expect.any(String),
        status: expect.any(String),
        transaction: expect.any(Object),
        txHash: expect.any(String),
      })
    );
  });

  it("With invalid txBroadCastId we should be getting an error for getTransactionBroadcastById", async () => {
    const txBroadCastId = "tx";
    const txId: Promise<any> =
      walletService.getTransactionBroadcastById(txBroadCastId);

    await expect(txId).rejects.toThrowError();
  });

  it("With valid public key and hash we should be able to get signature", async () => {
    // Correct formated
    const publicKey = "pk-california-butter-a387fbc156";
    const hash =
      "ab530a13e45914982b79f9b7e3fba994cfd1f3fb22f71cea1afbf02b460c6d1d";
    const signature = await walletService.createSignature(publicKey, hash);

    expect(signature).toEqual(
      expect.objectContaining({
        dateCreated: expect.any(String),
        hash: expect.any(String),
        id: expect.any(String),
        initiator: expect.any(Object),
        orgId: expect.any(String),
        publicKeyId: expect.any(String),
        r: expect.any(String),
        recid: expect.any(Number),
        s: expect.any(String),
        status: expect.any(String),
      })
    );
  });

  it("With signatureId we should be able to get signature element", async () => {
    // Correct formated
    const publicKeyId = "pk-california-butter-a387fbc156";
    const signatureId = "si-lima-black-98a02263ef";
    const signature = await walletService.getSignatureById(
      publicKeyId,
      signatureId
    );

    expect(signature).toEqual(
      expect.objectContaining({
        dateCreated: expect.any(String),
        hash: expect.any(String),
        id: expect.any(String),
        initiator: expect.any(Object),
        orgId: expect.any(String),
        publicKeyId: expect.any(String),
        r: expect.any(String),
        recid: expect.any(Number),
        s: expect.any(String),
        status: expect.any(String),
      })
    );
  });

  it("With invalid signatureId we should be getting an error for getSignatureById", async () => {
    const publicKeyId = "pk-california-butter-a387fbc156";
    const signatureId = "si";
    const signature: Promise<any> = walletService.getSignatureById(
      publicKeyId,
      signatureId
    );

    await expect(signature).rejects.toThrowError();
  });

  it("With invalid publicKeyId we should be getting an error for getSignatureById", async () => {
    const publicKeyId = "";
    const signatureId = "si-lima-black-98a02263ef";
    const signature: Promise<any> = walletService.getSignatureById(
      publicKeyId,
      signatureId
    );

    await expect(signature).rejects.toThrowError();
  });

  it("With listAPIKeys we should be able to get list of all API Keys", async () => {
    // Correct formated
    const listOfApiKeys = await walletService.listAPIKeys();

    expect(listOfApiKeys).toHaveProperty("items");
  });

  it("With apiKeyId we should be able to get API Key element", async () => {
    // Correct formated
    const apiKeyId = "api-cola-grey-78eec37d8f";
    const apiKey = await walletService.getAPIKeyById(apiKeyId);

    expect(apiKey).toEqual(
      expect.objectContaining({
        dateCreated: expect.any(String),
        name: expect.any(String),
        scopes: expect.any(Array),
        id: expect.any(String),
        authorId: expect.any(String),
        orgId: expect.any(String),
        status: expect.any(String),
      })
    );
  });

  it("With invalid apiKeyId we should be getting an error for getAPIKeyById", async () => {
    // With empty string for apiKeyId we get list of all API Keys
    const apiKeyId = "api";
    const apiKey: Promise<any> = walletService.getAPIKeyById(apiKeyId);

    await expect(apiKey).rejects.toThrowError();
  });

  // it("With listScopesApiKeys we should be able to get list of scopes for API Keys", async () => {
  //   // Correct formated
  //   const apiScope = await walletService.listScopesApiKeys();

  //   expect(apiScope).toMatchObject({
  //     status: 200,
  //   });
  // });
});
