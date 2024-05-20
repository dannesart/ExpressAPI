import { IAuthService } from "@/schema/auth";
import { MockAuthService } from "./mock";

export class AuthService {
  service: IAuthService;

  constructor(_useMock: boolean | string) {
    const useMock = typeof _useMock === "string" ? !!_useMock : _useMock;
    if (useMock) {
      this.service = new MockAuthService();
    } else {
      // TODO: implement this
      this.service = new MockAuthService();
    }
  }

  GetAuthService(): IAuthService {
    return this.service;
  }
}
