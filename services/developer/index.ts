import { IDeveloperService } from "@/schema/developer/service";
import { MockDeveloperService } from "./mock";
import { PeyyaDeveloperService } from "./peyya";

export class DeveloperService {
  service: IDeveloperService;

  constructor(_useMock: boolean | string) {
    const useMock = typeof _useMock === "string" ? !!_useMock : _useMock;

    if (useMock) {
      this.service = new MockDeveloperService();
    } else {
      this.service = new PeyyaDeveloperService();
    }
  }

  GetDeveloperService(): IDeveloperService {
    return this.service;
  }
}
