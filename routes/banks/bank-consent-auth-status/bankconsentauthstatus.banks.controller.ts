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
import Model from "./bankconsentauthstatus.banks.model";

/**
 * Schemas
 */
/**process.env.APP_USE_MOCK*/
const bankService = new BankService(false).GetBankService();

export class BankAuthStatusConsentController extends WalletController {
  constructor() {
    super(Model);
  }

  public init = async (req, res) => {
    const bicFi = req.headers.bicfi as string;
    const consentId = req.headers.consentid as string;
    const consentAuthId = req.headers.consentauthid as string;
    const ip = (req.headers["x-forwarded-for"] ||
      req.socket.remoteAddress) as string;

    try {
      const initConsent = await this.getAuthStatus(
        consentId,
        consentAuthId,
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

  public getAuthStatus = async (
    consentId: string,
    consentAuthId: string,
    bicFi: string,
    ip: string
  ) => {
    try {
      const consent = await bankService.getAuthStatus(
        consentId,
        consentAuthId,
        bicFi,
        ip
      );
      return consent;
    } catch (error) {
      throw error;
    }
  };
}
