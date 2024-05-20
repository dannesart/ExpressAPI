/**
 * Controller
 */
import { DeveloperController } from "@/controllers/developer.controller";

/**
 * Model
 */
import Model from "./patch.developeruser.model";

export class PatchDeveloperUserController extends DeveloperController {
  constructor() {
    super(Model);
  }

  public init = async (req, res, next) => {
    try {
      const { avatar, role } = req.body;
      const { id } = res.locals.developer;

      const updatedDeveloper = await this.updateDeveloper(id, { avatar, role });

      res.send({
        ...Model.responses[200],
        updatedDeveloper,
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
