/**
 * Controller
 */
import { DeveloperController } from "@/controllers/developer.controller";

/**
 * Model
 */
import Model from "./post.developeruser.model";

export class PostDeveloperUserController extends DeveloperController {
  constructor() {
    super(Model);
  }
}
