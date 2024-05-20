import {
  Developer,
  DeveloperRole,
  DeveloperStatus,
  IDeveloper,
  DeveloperId,
} from "@/schema/developer";
import jwt from "express-jwt";
import jwksRsa from "jwks-rsa";

/**
 * This is needed for process.env to work.
 */
require("dotenv").config();

/**
 * Developer validation.
 * Json Web Token. This should be the validator for developer auth.
 * This returns a middleware and throws an error if invalid token.
 * TODO: Add new API for developer auth. Now we use peyya.api as audience.
 * TODO: Change DEVELOPER_AUTH_AUTHIENCE to DEVELOPER_AUTH_AUDIENCE
 *
 */

export const checkDeveloperOpenIdToken = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.DEVELOPER_AUTH_DOMAIN}/.well-known/jwks.json`,
  }),

  audience: process.env.DEVELOPER_AUTH_AUTIENCE,
  issuer: `https://${process.env.DEVELOPER_AUTH_DOMAIN}/`,
  algorithms: ["RS256"],
});

/**
 * Developer creation.
 * Creates a document in the db.
 * Sets the status to active, and an id of user auth provider.
 */

export const CreateDeveloper = async (id: DeveloperId, name?: string) => {
  try {
    const developer: IDeveloper = {
      role: DeveloperRole.developer,
      id,
      status: DeveloperStatus.active,
      avatar: null,
    };

    const newDeveloper = new Developer(developer);
    await newDeveloper.save();
    return newDeveloper;
  } catch (error) {
    throw error;
  }
};

/**
 * Developer fetch.
 * Returns developer based on id.
 */

export const GetDeveloper = async (id: DeveloperId) => {
  try {
    const developer: IDeveloper = await Developer.findOne({ id });
    return developer;
  } catch (error) {
    throw error;
  }
};

/**
 * Developer update.
 * Updates and returns developer based on id.
 * Can update avatar & role.
 */

export const UpdateDeveloper = async (
  id: DeveloperId,
  data: { avatar: string; role: string }
) => {
  try {
    const developer: IDeveloper = await Developer.findOneAndUpdate(
      { id },
      { $set: { avatar: data.avatar, role: data.role } },
      { upsert: true }
    );
    return developer;
  } catch (error) {
    throw error;
  }
};

/**
 * Developer remove.
 * Removes and returns removed developer based on id.
 *
 */

export const DeleteDeveloper = async (id: DeveloperId) => {
  try {
    const developer: IDeveloper = await Developer.findOneAndDelete({ id });
    return developer;
  } catch (error) {
    throw error;
  }
};
