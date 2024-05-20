import { DfnsWalletService } from "@/services/wallet/dfns/wallet.service";

const dfns = new DfnsWalletService();

jest.setTimeout(30000);
// TODO: Remove the "x" from "xdescribe" once sFUEL is valid
xdescribe("Skale Testnet Transactions", () => {
  it("With valid input we should be able to send sFUEL", async () => {
    // Correct formated
    const transaction = await dfns.broadcastTransaction(
      "pk-california-butter-a387fbc156",
      "0xb4Ea99EA800E5f59fBA5e342aA3a1A07cB59A074",
      "0.01",
      "sFUEL"
    );

    expect(transaction).toMatchObject({
      status: 200,
    });
  });
});
