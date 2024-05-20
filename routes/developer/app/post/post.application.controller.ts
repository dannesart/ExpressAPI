/**
 * Controller
 */
import { DeveloperController } from "@/controllers/developer.controller";

/**
 * Model
 */
import Model from "./post.application.model";

export class PostApplicationController extends DeveloperController {
  constructor() {
    super(Model);
  }
}
