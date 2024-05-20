import {
  Application,
  ApplicationId,
  DeveloperId,
  IApplication,
} from "@/schema/developer";
import { Utils } from "@/utils";

export const CreateApplication = async (
  developerId: DeveloperId,
  applicationName: string
) => {
  try {
    const application: IApplication = {
      client_id: Utils._uuid(),
      client_secret: Utils._uuid(),
      creator: developerId,
      name: applicationName,
      id: Utils._uuid(),
      sandbox: true,
      use_credentials: true,
    };

    const newApplication = new Application(application);
    await newApplication.save();
    return newApplication;
  } catch (error) {
    throw error;
  }
};

export const DeleteApplication = async (
  developerId: DeveloperId,
  applicationId: ApplicationId
) => {
  try {
    const removed = await Application.deleteOne({
      creator: developerId,
      id: applicationId,
    });
    return removed;
  } catch (error) {
    throw error;
  }
};

export const GetApplications = async (
  developerId: DeveloperId,
  applicationId?: ApplicationId
) => {
  try {
    if (applicationId) {
      const application = await Application.findOne({
        id: applicationId,
        creator: developerId,
      });
      return application;
    } else {
      const applications = await Application.find({ creator: developerId });
      return applications;
    }
  } catch (error) {
    throw error;
  }
};

export const ValidateApplication = async (client_id: string, client_secret) => {
  try {
    const application = await Application.findOne({
      client_id,
    });
    if (
      application &&
      application.use_credentials &&
      application.client_secret === client_secret
    ) {
      return true;
    }
    if (application && !application.use_credentials) {
      return true;
    }
    throw new Error("No application found");
  } catch (error) {
    return false;
  }
};

export const UpdateApplication = async (
  developerId: DeveloperId,
  applicationId: ApplicationId,
  data: any
) => {
  try {
    const application: IApplication = await Application.findOneAndUpdate(
      { id: applicationId, creator: developerId },
      { $set: data }
    );
    return application;
  } catch (error) {
    throw error;
  }
};
