import { Utils } from "@/utils";

describe("Validations", () => {
  describe("Phone validation", () => {
    it("Should be correct phone number format", async () => {
      const verified = Utils.VerifyPhoneNumber("+46 70 1234567");
      expect(verified).toBeTruthy();
    });

    it("Should not be correct phone number format", async () => {
      const verified = Utils.VerifyPhoneNumber("+46 8 1234567");
      expect(verified).toBeFalsy();
    });

    it("Should be incorrect phone number format", async () => {
      const verified = Utils.VerifyPhoneNumber("46 8 1234567");
      expect(verified).toBeFalsy();
    });

    it("Should be correct phone number format", async () => {
      const verified = Utils.VerifyPhoneNumber("+46 1234567");
      expect(verified).toBeTruthy();
    });

    it("Should be incorrect phone number format", async () => {
      const verified = Utils.VerifyPhoneNumber("somebrokenstring");
      expect(verified).toBeFalsy();
    });
  });

  describe("Email validation", () => {
    it("Should be correct email format", async () => {
      const verified = Utils.VerifyEmail("danne@skilledpeople.se");
      expect(verified).toBeTruthy();
    });

    it("Should be incorrect email format", async () => {
      const verified = Utils.VerifyEmail("danne@skilledpeople");
      expect(verified).toBeFalsy();
    });
  });
});

describe("Generators", () => {
  describe("UUID", () => {
    it("Should return a string with 4 segement of random letters and numbers", async () => {
      const uuid = Utils._uuid();
      expect(uuid).toContain("-");
    });
  });
  describe("Ascii", () => {
    it("Should return A in ascii", () => {
      const ascii = Utils.ascii("a");
      expect(ascii).toEqual("97");
    });
    it("Should return A in ascii but expect to fail if we pass in something else", () => {
      const ascii = Utils.ascii("f");
      expect(ascii).not.toEqual("97");
    });
  });
});
