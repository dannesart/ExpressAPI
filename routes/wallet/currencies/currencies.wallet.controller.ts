/**
 * Controller
 */
import { WalletController } from "@/controllers/wallet.controller";
import { NewUser } from "@/services/wallet/dfns/new.pk.user.service";
import { currencies } from "@/vendor/currencies";

/**
 * Model
 */
import Model from "./currencies.wallet.model";

const dfnsUser = new NewUser();

export class GetCurrenciesController extends WalletController {
  constructor() {
    super(Model);
  }

  public init = async (req, res, next) => {
    try {
      res.send({
        status: 200,
        currencies: currencies,
      });
    } catch (error) {
      res.statusCode = 500;
      res.send({
        status: 500,
        error: "Could not get wallet",
      });
    }
  };
}
