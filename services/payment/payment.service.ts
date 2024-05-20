import { IPaymentService } from "@/schema/payment";
import { IPaymentAuth } from "@/schema/payment/auth";
import { IPaymentUsers } from "@/schema/payment/users";
import { MockPaymentService } from "./mock/mock-payment-service";
import { Monerium, MoneriumUser, MoneriumAuth } from "./monerium";

export class PaymentService {
  service: IPaymentService;

  constructor(_useMock: boolean | string) {
    const useMock = typeof _useMock === "string" ? !!_useMock : _useMock;

    if (useMock) {
      this.service = new MockPaymentService();
    } else {
      this.service = new Monerium();
    }
  }

  GetPaymentService(): IPaymentService {
    return this.service;
  }
}

export class PaymentServiceUser {
  service: IPaymentUsers;

  constructor(_useMock: boolean | string) {
    const useMock = typeof _useMock === "string" ? !!_useMock : _useMock;

    if (useMock) {
      this.service = new MoneriumUser();
    } else {
      this.service = new MoneriumUser();
    }
  }

  GetPaymentUserService(): IPaymentUsers {
    return this.service;
  }
}

export class PaymentServiceAuth {
  service: IPaymentAuth;

  constructor(_useMock: boolean | string) {
    const useMock = typeof _useMock === "string" ? !!_useMock : _useMock;

    if (useMock) {
      this.service = new MoneriumAuth();
    } else {
      this.service = new MoneriumAuth();
    }
  }

  GetPaymentAuthService(): IPaymentAuth {
    return this.service;
  }
}
