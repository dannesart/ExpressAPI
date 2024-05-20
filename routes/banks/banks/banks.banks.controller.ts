/**
 * Controller
 */
import { WalletController } from "@/controllers/wallet.controller";

/**
 * Services
 */
import { BankService } from "@/services/bank/bank.service";
import { ErrorStatuses } from "@/vendor/errors";

/**
 * Schemas
 */

/**
 * Model
 */
import Model from "./banks.banks.model";
/**process.env.APP_USE_MOCK*/
const bankService = new BankService(false).GetBankService();

export class BanksWalletController extends WalletController {
  constructor() {
    super(Model);
  }

  public init = async (req, res, next) => {
    const isoCountry = req.query.isoCountry || "SE";

    try {
      const banks = await this.get(isoCountry);
      res.send({
        status: 200,
        banks,
      });
    } catch (error) {
      return res
        .status(ErrorStatuses.expectationFailed)
        .send(Model.responses[ErrorStatuses.expectationFailed]);
    }
  };

  private get = async (isoCountry) => {
    try {
      const banks = await bankService.getAccounts(isoCountry);
      return banks;
    } catch (error) {
      throw error;
    }
  };
}
