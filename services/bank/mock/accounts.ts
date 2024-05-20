import { BankInitConsentResponse } from "@/schema/bank/account";
import {
  BankAccount,
  BankCountry,
  BankAccountCreationResponse,
  BankAccountResponseStatus,
  BankAccountsResponse,
} from "@/schema/bank/account";

const BankAccountMock: BankAccount = {
  name: "My bank",
  logoUrl: "path/to/logo",
  bicFi: "bicFI",
};

const BankCountryMock: BankCountry = {
  isoCountryCode: "SE",
  name: "Sweden",
};

const BankInitConsentResponseMock: BankInitConsentResponse = {
  consentStatus: "received",
  consentId: "fbce243a-88b6-47ae-8f48-8f93458b362f",
  scaMethods: [
    {
      authenticationType: "PUSH_OTP",
      authenticationMethodId: "mbid",
      name: "Mobilt BankID",
    },
    {
      authenticationType: "CHIP_OTP",
      authenticationMethodId: "mbid_same_device",
      name: "Mobile BankID on this device",
    },
    {
      authenticationType: "PHOTO_OTP",
      authenticationMethodId: "mbid_animated_qr_token",
      name: "Mobile BankID on another device",
    },
  ],
  _links: {
    self: {
      href: "/psd2/consent/v1/consents/fbce243a-88b6-47ae-8f48-8f93458b362f",
    },
    status: {
      href: "/psd2/consent/v1/consents/fbce243a-88b6-47ae-8f48-8f93458b362f/status",
    },
    startAuthorisation: {
      href: "/psd2/consent/v1/consents/fbce243a-88b6-47ae-8f48-8f93458b362f/authorisations",
    },
  },
};

const BankAccountCreatedMockResponse: BankAccountCreationResponse = {
  status: BankAccountResponseStatus.success,
  account: BankAccountMock,
};

const BankAccountRemovedMockResponse: BankAccountCreationResponse = {
  status: BankAccountResponseStatus.success,
  account: { ...BankAccountMock },
};

const BankAccountsMockResponse: BankAccountsResponse = {
  status: BankAccountResponseStatus.success,
  accounts: [BankAccountMock],
};

export {
  BankAccountCreatedMockResponse,
  BankAccountRemovedMockResponse,
  BankAccountsMockResponse,
  BankAccountMock,
  BankCountryMock,
  BankInitConsentResponseMock,
};
