import { NewUser } from "@/services/wallet/dfns/new.pk.user.service";
import { DfnsWalletServiceMumbai } from "@/services/wallet/dfns/mumbai.wallet.service";

const dfns = new DfnsWalletServiceMumbai();
const addressservice = new NewUser();

jest.setTimeout(30000);

describe("Mumbai Testnet Transactions", () => {
  it("With valid input we should be able to send EURe", async () => {
    // Correct formated
    const transaction = await addressservice.sendToPeyyaUser(
      "pk-california-butter-a387fbc156",
      "pk-chicken-wyoming-83d3770136",
      "1",
      "EURe"
    );

    // await new Promise((r) => setTimeout(r, 30000));

    // const paymentId = await dfns.getTransactionBroadcastById(transaction.id);

    expect(transaction).toEqual(
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

    // expect(paymentId).toEqual(
    //   expect.objectContaining({
    //     dateBroadcasted: expect.any(String),
    //     dateCreated: expect.any(String),
    //     dateUpdated: expect.any(String),
    //     id: expect.any(String),
    //     initiator: expect.any(Object),
    //     network: expect.any(String),
    //     networkResponse: expect.any(Object),
    //     orgId: expect.any(String),
    //     publicKeyId: expect.any(String),
    //     snapshot: expect.any(String),
    //     status: expect.any(String),
    //     transaction: expect.any(Object),
    //     txHash: expect.any(String),
    //   }));
  });

  it("With valid input we should be able to send USDe", async () => {
    // Correct formated
    const transaction = await addressservice.sendToPeyyaUser(
      "pk-california-butter-a387fbc156",
      "pk-chicken-wyoming-83d3770136",
      "1",
      "USDe"
    );

    // await new Promise((r) => setTimeout(r, 30000));

    // const paymentId = await dfns.getTransactionBroadcastById(transaction.id);

    expect(transaction).toEqual(
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

    // expect(paymentId).toEqual(
    //   expect.objectContaining({
    //     dateBroadcasted: expect.any(String),
    //     dateCreated: expect.any(String),
    //     dateUpdated: expect.any(String),
    //     id: expect.any(String),
    //     initiator: expect.any(Object),
    //     network: expect.any(String),
    //     networkResponse: expect.any(Object),
    //     orgId: expect.any(String),
    //     publicKeyId: expect.any(String),
    //     snapshot: expect.any(String),
    //     status: expect.any(String),
    //     transaction: expect.any(Object),
    //     txHash: expect.any(String),
    //   }));
  });

  it("With valid input we should be able to send MATIC transaction", async () => {
    // Correct formated
    const walletTopUpMatic = await dfns.broadcastTransaction(
      "pk-california-butter-a387fbc156",
      "0x8dd4aB3734BDD4E8768c9018E69579CF2CD20281",
      "0.01",
      "MATIC"
    );

    expect(walletTopUpMatic).toEqual(
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

  it("With valid input we should be able to get balance of user", async () => {
    // Correct formated
    const balance = await addressservice.getBalanceOfPeyyaUserId(
      "pk-johnny-ohio-d3bbf3f0fd"
    );

    expect(balance).toEqual(
      expect.objectContaining({
        EURe: expect.any(String),
        USDe: expect.any(String),
      })
    );
  });

  it("With valid input we should be able to get address of user", async () => {
    // Correct formated
    const address = await addressservice.addressOfPeyyaUserId(
      "pk-cold-avocado-9d192588e4"
    );
    expect(typeof address).toBe("string");
  });

  it("With valid input we should be able to topUp wallet", async () => {
    // Correct formated
    const topUp = await addressservice.topUpWallet(
      "pk-cold-avocado-9d192588e4"
    );

    expect(topUp[0]).toEqual(
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

    expect(topUp[1]).toEqual(
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

    expect(topUp[2]).toEqual(
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
});
