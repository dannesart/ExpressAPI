import { NewUser } from "@/services/wallet/dfns/new.user.service";

const newUser = new NewUser();

jest.setTimeout(30000);

describe("New User Tests & Phone Number transactions", () => {
  // it("With peyyaUserId we should be able to create new wallet", async () => {
  //   // Correct formated
  //   const createUser = await newUser.createUserWallet("1212121221");

  //   expect(createUser).toHaveProperty("id");
  //   expect(createUser).toHaveProperty("orgId");
  //   expect(createUser).toHaveProperty("status");
  //   expect(createUser).toHaveProperty("assetSymbol");
  //   expect(createUser).toHaveProperty("name");
  //   expect(createUser).toHaveProperty("groupSize");
  //   expect(createUser).toHaveProperty("groupThreshold");
  //   expect(createUser).toHaveProperty("dateCreated");
  //   expect(createUser).toHaveProperty("dateUpdate");
  // });

  it("With new wallet we should be able to top up the wallet with 0.01 ETH", async () => {
    // Correct formated
    const topup = await newUser.topUpWallet("0000000004");

    expect(topup).toEqual(
      expect.objectContaining({
        receiver: expect.any(Object),
        assetSymbol: expect.any(String),
        amount: expect.any(String),
        note: expect.any(String),
        narrative: expect.any(String),
        externalId: expect.any(String),
        assetAccountId: expect.any(String),
        initiator: expect.any(Object),
        status: expect.any(String),
        dateCreated: expect.any(String),
        orgId: expect.any(String),
        receiverAddress: expect.any(String),
        id: expect.any(String),
      })
    );
  });

  it("With peyyaUserId we should be able to get asset account address", async () => {
    // Correct formated
    const assetAccount = await newUser.addressOfPeyyaUserId("0000000004");

    expect(assetAccount).toMatch("aa-moon-single-social-bc61054b08");
    expect(typeof assetAccount).toBe("string");
  });

  it("With peyyaUserId we should be able to send transaction to another peyyaUserId", async () => {
    // Correct formated
    const transaction = await newUser.sendToPeyyaUser(
      "0000000005",
      "0000000004",
      "0.0001"
    );

    expect(transaction).toEqual(
      expect.objectContaining({
        receiver: expect.any(Object),
        assetSymbol: expect.any(String),
        amount: expect.any(String),
        note: expect.any(String),
        narrative: expect.any(String),
        externalId: expect.any(String),
        assetAccountId: expect.any(String),
        initiator: expect.any(Object),
        status: expect.any(String),
        dateCreated: expect.any(String),
        orgId: expect.any(String),
        receiverAddress: expect.any(String),
        id: expect.any(String),
      })
    );
  });

  it("With peyyaUserId we should be able to get balance", async () => {
    // Correct formated
    const balance = await newUser.getBalanceOfPeyyaUserId("0000000005");

    expect(balance).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        assetSymbol: expect.any(String),
        balance: expect.any(String),
      })
    );
  });
});
