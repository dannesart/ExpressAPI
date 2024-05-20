/**
 * Controller
 */
import { TransactionController } from "@/controllers/transaction.controller";

/**
 * Model
 */
import Model from "./get.holds.model";

export class GetHoldsController extends TransactionController {
  constructor() {
    super(Model);
  }

  public getHolds = async (holdId: string) => {
    return [];
  };
}
