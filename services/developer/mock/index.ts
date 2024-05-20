import { IDeveloperService } from "@/schema/developer/service";
import {
  CreateApplication,
  DeleteApplication,
  GetApplications,
  UpdateApplication,
  ValidateApplication,
} from "./application";
import {
  CreateDeveloper,
  GetDeveloper,
  UpdateDeveloper,
  DeleteDeveloper,
} from "./user";

export class MockDeveloperService implements IDeveloperService {
  CreateDeveloper = CreateDeveloper;
  GetDeveloper = GetDeveloper;
  UpdateDeveloper = UpdateDeveloper;
  CreateApplication = CreateApplication;
  DeleteApplication = DeleteApplication;
  GetApplications = GetApplications;
  UpdateApplication = UpdateApplication;
  ValidateApplication = ValidateApplication;
  DeleteDeveloper = DeleteDeveloper;
}
