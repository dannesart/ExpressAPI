import { PaymentService } from "@/services/payment/payment.service";

describe("Create user with required data", () => {
  let paymentService;

  beforeEach(() => {
    paymentService = new PaymentService(true).GetPaymentService();
  });

  it("With a walletId we should be able to fetch history", async () => {
    // Correct formated
    const walletId = "arandomstringvalueasid";

    const walletTransactionHistory: Promise<any> =
      paymentService.GetWalletTransactionHistory(walletId);

    await expect(walletTransactionHistory).resolves.toMatchObject({
      status: 200,
    });
  });

  it("With no walletId we should be getting an error", async () => {
    // Correct formated
    const walletId: string = null;

    const walletTransactionHistory: Promise<any> =
      paymentService.GetWalletTransactionHistory(walletId);

    await expect(walletTransactionHistory).rejects.toThrowError();
  });
});
