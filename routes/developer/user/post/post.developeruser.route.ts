import { ErrorStatuses } from "@/vendor/errors";
/**
 * Dependencies
 */
import express from "express";

/**
 * Model
 */
import Model from "./post.developeruser.model";

/**
 * Controller
 */
import { PostDeveloperUserController } from "./post.developeruser.controller";
const router = express.Router();
const controller = new PostDeveloperUserController();

router.post(Model.path, controller.verifyDeveloper, async (req, res) => {
  try {
    const developerName = req.body.name;
    const developerId = "";

    if (!developerName) {
      throw new Error("Missing name");
    }

    // const newDeveloper = await controller.createDeveloper(
    //   developerName,
    //   developerId
    // );

    res.send({
      ...Model.responses[200],
      message: "This call is deprecated",
    });
  } catch (error) {
    res.statusCode = 500;
    res.send({
      status: 500,
      error,
    });
  }
});

export default router;
