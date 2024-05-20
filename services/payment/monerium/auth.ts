import { Utils } from "@/utils";
import { ApiClient } from "@/utils/client";
import CryptoJS from "crypto-js";

require("dotenv").config();

const api = new ApiClient();
let token;
let type;
let verifier;
let expires;

export class MoneriumAuth {
  public getContext = async (token: string) => {
    try {
      const authUrl = `${process.env.MONERIUM_API_HOST}/auth/context`;
      const context = await api.get(
        authUrl,
        {},
        {
          Authorization: `Bearer ${token}`,
        }
      );
      return context;
    } catch (error) {
      throw error;
    }
  };

  public getProfile = async (profileId: string, token: string) => {
    try {
      const authUrl = `${process.env.MONERIUM_API_HOST}/profiles/${profileId}`;
      const profile = await api.get(
        authUrl,
        {},
        {
          Authorization: `Bearer ${token}`,
        }
      );
      return profile;
    } catch (error) {
      throw error;
    }
  };

  public getBalances = async (profileId: string, token: string) => {
    try {
      // const authUrl = `${process.env.MONERIUM_API_HOST}/profiles/${profileId}/balance`;

      const authUrl = `https://api.monerium.dev/profiles/${profileId}/balances`;
      const balance = await api.get(
        authUrl,
        {},
        {
          Authorization: `Bearer ${token}`,
        }
      );

      return balance;
    } catch (error) {
      throw error;
    }
  };

  public getAllBalances = async (token: string) => {
    try {
      const authUrl = `${process.env.MONERIUM_API_HOST}/balances`;
      const balance = await api.get(
        authUrl,
        {},
        {
          Authorization: `Bearer ${token}`,
        }
      );

      return balance;
    } catch (error) {
      throw error;
    }
  };

  public getAllOrders = async (token: string) => {
    try {
      const authUrl = `${process.env.MONERIUM_API_HOST}/orders`;
      const balance = await api.get(
        authUrl,
        {},
        {
          Authorization: `Bearer ${token}`,
        }
      );

      return balance;
    } catch (error) {
      throw error;
    }
  };

  public getToken = async () => {
    // if (token && !this.isTokenExpired()) {
    //   return token;
    // }

    await this.tokenRequest();
    return token;
  };

  private isTokenExpired = () => {
    if (expires && new Date().getTime() < expires) return false;

    return true;
  };

  private getVerifier = async () => {
    if (verifier) return verifier;

    verifier = Utils._uuid() + Utils._uuid();
    return verifier;
  };

  private tokenRequest = async () => {
    try {
      const code_verifier = await this.getVerifier();
      // const code_challenge = btoa(Utils.sha256(Utils.ascii(code_verifier)));
      const code_challenge = CryptoJS.enc.Base64url.stringify(
        CryptoJS.SHA256(code_verifier)
      );
      const authUrl = `${process.env.MONERIUM_API_HOST}/auth/token`;
      const authParams = new URLSearchParams({
        client_id: process.env.MONERIUM_CLIENT_ID,
        client_secret: process.env.MONERIUM_CLIENT_SECRET,
        grant_type: process.env.MONERIUM_GRANT_TYPE,
      });

      const request = await api.post(authUrl, authParams, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      const { access_token, token_type, expires_in } = request.data;
      token = access_token;
      type = token_type;
      expires = new Date().getTime() + expires_in;
      return request;
    } catch (error) {
      token = null;
      throw error;
    }
  };

  public getConfigs = async () => {
    // const code_verifier = await this.getVerifier();
    // const code_challenge = btoa(Utils.sha256(Utils.ascii(code_verifier)));

    const code_verifier = CryptoJS.lib.WordArray.random(64).toString();
    const code_challenge = CryptoJS.enc.Base64url.stringify(
      CryptoJS.SHA256(code_verifier)
    );
    return {
      code_verifier,
      code_challenge,
      auth_client_id: process.env.MONERIUM_AUTH_CLIENT_ID,
      client_id: process.env.MONERIUM_CLIENT_ID,
      client_secret: process.env.MONERIUM_CLIENT_SECRET,
      grant_type: process.env.MONERIUM_GRANT_TYPE,
      redirect_uri: process.env.APP_URL,
      code_challenge_method: "S256",
    };
  };

  public initAuth = async () => {
    try {
      const {
        code_challenge,
        client_id,
        client_secret,
        auth_client_id,
        code_challenge_method,
        grant_type,
        redirect_uri,
      } = await this.getConfigs();
      const authUrl = `${process.env.MONERIUM_API_HOST}/auth`;
      const authParams = new URLSearchParams({
        code_challenge,
        client_id: auth_client_id,
        code_challenge_method,
        redirect_uri,
      });

      const request = await api.get(authUrl, authParams, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      const { data } = request.data;

      return data;
    } catch (error) {
      throw error;
    }
  };
}
