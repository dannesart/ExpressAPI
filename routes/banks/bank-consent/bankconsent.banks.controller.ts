/**
 * Controller
 */
import { WalletController } from "@/controllers/wallet.controller";
import { BankInitConsent } from "@/schema/bank/account";

/**
 * Services
 */
import { BankService } from "@/services/bank/bank.service";
import { ErrorStatuses } from "@/vendor/errors";

/**
 * Model
 */
import Model from "./bankconsent.banks.model";

/**
 * Schemas
 */
/**process.env.APP_USE_MOCK*/
const bankService = new BankService(false).GetBankService();

export class BankInitConsentController extends WalletController {
  constructor() {
    super(Model);
  }

  public init = async (req, res) => {
    let ip = (req.headers["x-forwarded-for"] ||
      req.socket.remoteAddress) as string;
    if (ip.indexOf(",")) {
      ip = ip.split(",")[0].replace(/ /g, "");
    }

    const bicFi = req.body.bicFi;
    const userAgent = "mozilla/5.0";

    const consentObject = {
      access: {},
      recurringIndicator: true,
      validUntil: new Date(new Date().getTime() + 604800000)
        .toISOString()
        .split("T")[0],
      frequencyPerDay: 4,
      combinedServiceIndicator: false,
    };

    try {
      const initConsent = await this.initConsent(
        consentObject,
        bicFi,
        ip,
        userAgent
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

  public initConsent = async (
    data: BankInitConsent,
    bicFi: string,
    ip: string,
    userAgent: string
  ) => {
    try {
      const consent = await bankService.initConsent(data, bicFi, userAgent, ip);
      const { consentId } = consent;
      const initAuth = await bankService.startAuthConsent(consentId, bicFi, ip);
      return { ...initAuth.data, consentId, bicFi };
    } catch (error) {
      throw error;
    }
  };
}
