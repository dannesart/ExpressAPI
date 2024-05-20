import { UserController } from "./user.controller";
import { IRequest } from "@/schema/common";

export class TransactionController extends UserController {
  constructor(public requestModel: IRequest) {
    super(requestModel);
  }
}
