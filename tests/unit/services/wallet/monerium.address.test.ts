import { MoneriumAddress } from "@/services/payment/monerium/address";

const addressservice = new MoneriumAddress();

jest.setTimeout(30000);
// TODO: Remove the "x" from "xdescribe" once Monerium Address is valid
xdescribe("Test Monerium Address", () => {
  it("With valid input we should be able to add address to monerium", async () => {
    // Correct formated
    // TODO: addAddressToMonerium requires 1 argument, an publicKey (String)
    const moneriumAddress = await addressservice.addAddressToMonerium(
      "Missing public key"
    );
    expect(moneriumAddress).toMatchObject({
      status: 200,
    });
  });
});
