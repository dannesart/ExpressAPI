import { IPaymentService } from "@/schema/payment";
import { MoneriumPayments } from "./payments";
import { MoneriumUser } from "./user";
import { MoneriumAuth } from "./auth";

export { MoneriumUser, MoneriumAuth };

export class Monerium extends MoneriumPayments implements IPaymentService {
  constructor() {
    super();
  }
}
