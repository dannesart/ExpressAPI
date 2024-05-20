/**
 * Common error codes
 *
 */

export enum ErrorStatuses {
  server = 500,
  unauthorized = 401,
  notFound = 404,
  forbidden = 403,
  activeWallet = 409,
  expectationFailed = 417,
  unprocessedEntity = 422,
  badRequest = 400,
}

/**
 * Common Error messages.
 * Used in cases where there is no specific area connected
 */

export enum ErrorMessages {
  notAvailable = "The service is not available.",
  notAnswering = "The service is not answering.",
  notBeCreated = "The action could not be created.",
  notBeUpdated = "The action could not be updated.",
  notBeDeleted = "The action could not be deleted.",
  notBeFetched = "The action could not be fetched.",
  noValidToken = "There was no valid token provided.",
}

export enum AuthErrorMessage {
  requestIsAlreadyInProgress = "A request is already in action.",
  couldNotAuthenticate = "An unexpected error occured. Try again.",
}

/**
 * Error messages for user actions.
 * These are matching with the codes
 */

export enum UserErrorMessages {
  userNotCreated = "The user could not be created.",
  userCreatedBut = "The user was created, but something else happend.",
  userNotUpdated = "The user could not be updated",
  userTokenIsInvalid = "Invalid user token",
  userMissingToken = "There was no user token provided",
  userMissingEmail = "There was no email provided",
  userMissingPhone = "There was no phone provided",
  userNotFound = "Could not found a user with that Id",
  userNotCreatedInThirdParty = "An undefined error occured while creating the account",
  userNoVerificationSent = "An verification message could not be sent.",
  userNotValidRole = "Access denied",
  expectationFailed = "What was expected failed.",
}

/**
 * Error codes for user actions.
 * These are matching with the messages
 */

export enum AuthErrorCodes {
  requestIsAlreadyInProgress = "riaip1",
  couldNotAuthenticate = "cna1",
}

/**
 * Error codes for user actions.
 * These are matching with the messages
 */

export enum UserErrorCodes {
  userNotCreated = "uc1",
  userCreatedBut = "ucb1",
  userNotUpdated = "uu1",
  userTokenIsInvalid = "uti1",
  userMissingToken = "utm1",
  userMissingEmail = "ume1",
  userMissingPhone = "ump1",
  userNotFound = "unf1",
  userNotCreatedInThirdParty = "unctp1",
  userNoVerificationSent = "unvs1",
  userNotValidRole = "unvr1",
  expectationFailed = "ef1",
}

/**
 * Error messages for wallet actions.
 * These are matching with the codes
 */

export enum WalletErrorMessages {
  walletNotCashIn = "Could not cash in.",
  walletNotCashOut = "Could not cash out.",
  walletNotFound = "Could not find wallet",
  walletHistory = "Could net recieve wallet history.",
}

/**
 * Error codes for wallet actions.
 * These are matching with the messages
 */

export enum WalletErrorCodes {
  walletNotCashIn = "wnci1",
  walletNotCashOut = "wnco1",
  walletNotFound = "wnf1",
  walletHistory = "whnf1",
}

/**
 * Error messages for bank actions.
 * These are matching with the codes
 */

export enum BankErrorMessages {
  bankCountriesNotGet = "Could not get countries.",
  bankNotGet = "Could not get banks.",
  bankNotInitConsent = "Could not start a consent",
}

/**
 * Error codes for bank actions.
 * These are matching with the messages
 */

export enum BankErrorCodes {
  bankCountriesNotGet = "bcng1",
  bankNotGet = "bng1",
  bankNotInitConsent = "bnic1",
}
