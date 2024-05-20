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
 * Model
 */
import Model from "./connect.banks.model";

/**
 * Schemas
 */
/**process.env.APP_USE_MOCK*/
const bankService = new BankService(false).GetBankService();

export class BankConnectController extends WalletController {
  constructor() {
    super(Model);
  }

  public init = async (req, res, next) => {
    try {
      await bankService.initConnect(req, res, next);
    } catch (error) {
      return res
        .status(ErrorStatuses.expectationFailed)
        .send(Model.responses[ErrorStatuses.expectationFailed]);
    }
  };
}
