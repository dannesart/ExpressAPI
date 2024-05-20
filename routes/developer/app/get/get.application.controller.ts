/**
 * Controller
 */
import { DeveloperController } from "@/controllers/developer.controller";
import { ApplicationId } from "@/schema/developer/application";

/**
 * Model
 */
import Model from "./get.application.model";

export class GetApplicationController extends DeveloperController {
  constructor() {
    super(Model);
  }

  public init = async (req, res, next) => {
    try {
      const developerId = res.locals.developer.id;
      const applicationId: ApplicationId | null =
        (req.query.applicationId as string) || null;

      if (!developerId) {
        throw new Error("Missing developerId");
      }

      const applications = await this.getApplications(
        developerId,
        applicationId
      );

      res.send({
        ...Model.responses[200],
        applications,
      });
    } catch (error) {
      res.statusCode = 500;
      res.send({
        status: 500,
        error,
      });
    }
  };
}
