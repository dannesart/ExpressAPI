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
import Model from "./banks-countries.banks.model";
/**process.env.APP_USE_MOCK*/
const bankService = new BankService(false).GetBankService();

export class BanksCountriesWalletController extends WalletController {
  constructor() {
    super(Model);
  }

  public init = async (req, res) => {
    try {
      const countries = await this.get();
      res.send({
        status: 200,
        countries,
      });
    } catch (error) {
      return res
        .status(ErrorStatuses.expectationFailed)
        .send(Model.responses[ErrorStatuses.expectationFailed]);
    }
  };

  public get = async () => {
    try {
      // Get user
      // const { paymentUserId } = (await this.getUser(peyyaUserId)) as IUser;

      // Do request with paymentUserId
      const banks = await bankService.getCountries();
      return banks;
    } catch (error) {
      throw error;
    }
  };
}
