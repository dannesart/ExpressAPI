/**
 * Controller
 */
import { DeveloperController } from "@/controllers/developer.controller";

/**
 * Model
 */
import Model from "./get.developeruser.model";

export class GetDeveloperUserController extends DeveloperController {
  constructor() {
    super(Model);
  }
}
