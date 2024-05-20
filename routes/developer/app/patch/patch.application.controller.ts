/**
 * Controller
 */
import { DeveloperController } from "@/controllers/developer.controller";

/**
 * Model
 */
import Model from "./patch.application.model";

export class PatchApplicationController extends DeveloperController {
  constructor() {
    super(Model);
  }
}
