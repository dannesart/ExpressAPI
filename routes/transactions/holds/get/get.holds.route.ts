/**
 * Dependencies
 */
import express from "express";

/**
 * Get user model.
 * Used for swagger.
 */
import Model from "./get.holds.model";

/**
 * Controller
 */
import { GetHoldsController } from "./get.holds.controller";
const controller = new GetHoldsController();

/**
 * Endpoints for transaction GET
 */
const router = express.Router();

// Get all current holds
router.get(Model.path, controller.verifyUser, async (req, res) => {
  res.send("Not implemented yet");
});

export default router;
