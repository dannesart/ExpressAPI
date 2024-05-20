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
import Model from "./bankconsentauth.banks.model";

/**
 * Schemas
 */
/**process.env.APP_USE_MOCK*/
const bankService = new BankService(false).GetBankService();

export class BankAuthConsentController extends WalletController {
  constructor() {
    super(Model);
  }

  public init = async (req, res) => {
    const bicFi = req.body.bicFi;
    const consentId = req.body.consentId;
    const consentAuthId = req.body.consentAuthId;
    const authMethodId = req.body.authMethodId;
    const ip = (req.headers["x-forwarded-for"] ||
      req.socket.remoteAddress) as string;

    try {
      const initConsent = await this.pickAuthMethod(
        consentId,
        consentAuthId,
        authMethodId,
        bicFi,
        ip
      );
      res.send({
        status: 200,
        consent: initConsent,
      });
    } catch (error) {
      return res
        .status(ErrorStatuses.expectationFailed)
        .send(Model.responses[ErrorStatuses.expectationFailed]);
    }
  };

  public pickAuthMethod = async (
    consentId: string,
    consentAuthId: string,
    authMethodId: string,
    bicFi: string,
    ip: string
  ) => {
    try {
      const consent = await bankService.pickAuthMethod(
        consentId,
        consentAuthId,
        authMethodId,
        bicFi,
        ip
      );
      return { method: consent.chosenScaMethod, status: consent.scaStatus };
    } catch (error) {
      throw error;
    }
  };
}
