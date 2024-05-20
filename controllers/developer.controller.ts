import { ApplicationId, DeveloperId } from "@/schema/developer";
import { AuthController } from "./auth.controller";
import { IRequest } from "@/schema/common";

/**
 * Services
 */
import { DeveloperService } from "@/services/developer";
import { checkDeveloperOpenIdToken } from "@/services/developer/mock/user";

/**
 * This is needed for process.env to work.
 */
require("dotenv").config();

const developerService = new DeveloperService(
  process.env.APP_USE_MOCK
).GetDeveloperService();

export class DeveloperController extends AuthController {
  constructor(public requestModel: IRequest) {
    super(requestModel);
  }

  public verifyUser = checkDeveloperOpenIdToken;

  public verifyDeveloper = async (req, res, next) => {
    try {
      const developerId = req.user.sub;
      let developer = await this.getDeveloper(developerId);
      if (!developer) {
        developer = await this.createDeveloper(developerId);
      }
      res.locals.developer = developer;
      next();
    } catch (error) {
      res.status(500).send({ status: 500, message: error.message });
    }
  };

  public createDeveloper = async (id: DeveloperId) => {
    try {
      const developer = await developerService.CreateDeveloper(id);
      return developer;
    } catch (error) {
      throw error;
    }
  };

  public getDeveloper = async (id: DeveloperId) => {
    try {
      const developer = await developerService.GetDeveloper(id);
      return developer;
    } catch (error) {
      throw error;
    }
  };

  public updateDeveloper = async (id: DeveloperId, data: any) => {
    try {
      const developer = await developerService.UpdateDeveloper(id, data);
      return developer;
    } catch (error) {
      throw error;
    }
  };

  public handleApplicationSettings = async (req, res, next) => {
    const { clientid } = req.headers;
    if (!clientid) {
      res.statusCode = 400;
      return res.send({
        headers: req.headers,
        message: "Missing client_id",
      });
    }

    next();
  };

  public verifyApplication = async (req, res, next) => {
    const { clientid, clientsecret } = req.headers;
    const isValid = await developerService.ValidateApplication(
      clientid,
      clientsecret
    );
    if (!isValid) {
      res.statusCode = 400;
      return res.send("Your application is not valid");
    }

    next();
  };

  public createApplication = async (id: DeveloperId, name: string) => {
    try {
      const application = await developerService.CreateApplication(id, name);
      return application;
    } catch (error) {
      throw error;
    }
  };

  public deleteApplication = async (
    developerId: DeveloperId,
    applicationId: ApplicationId
  ) => {
    try {
      const application = await developerService.DeleteApplication(
        developerId,
        applicationId
      );
      return application;
    } catch (error) {
      throw error;
    }
  };

  public getApplications = async (
    developerId: DeveloperId,
    id?: ApplicationId
  ) => {
    try {
      const application = await developerService.GetApplications(
        developerId,
        id || null
      );
      return application._doc || application;
    } catch (error) {
      throw error;
    }
  };

  public updateApplication = async (
    developerId: DeveloperId,
    id: ApplicationId,
    data: any
  ) => {
    try {
      const application = await developerService.UpdateApplication(
        developerId,
        id,
        data
      );
      return application;
    } catch (error) {
      throw error;
    }
  };
}
