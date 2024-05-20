import { IDeveloper } from "@/schema/developer/user";
import { ErrorStatuses } from "@/vendor/errors";
/**
 * Dependencies
 */
import express from "express";

/**
 * Model
 */
import Model from "./get.developeruser.model";

/**
 * Controller
 */
import { GetDeveloperUserController } from "./get.developeruser.controller";
const router = express.Router();
const controller = new GetDeveloperUserController();

router.get(
  Model.path,
  controller.verifyUser,
  controller.verifyDeveloper,
  async (req, res) => {
    try {
      const { id, status, name, role, avatar } = res.locals.developer;

      const developer: IDeveloper = {
        id,
        status,
        name,
        role,
        avatar,
      };

      res.send({
        ...Model.responses[200],
        developer,
      });
    } catch (error) {
      res.statusCode = 500;
      res.send({
        status: 500,
        error,
      });
    }
  }
);

export default router;
