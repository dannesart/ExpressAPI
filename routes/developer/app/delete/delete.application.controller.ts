/**
 * Controller
 */
import { DeveloperController } from "@/controllers/developer.controller";

/**
 * Model
 */
import Model from "./delete.application.model";

export class DeleteApplicationController extends DeveloperController {
  constructor() {
    super(Model);
  }
}
