import { IPaymentUsers } from "@/schema/payment/users";
import { ApiClient } from "@/utils/client";
import { MoneriumAuth } from "./auth";

export class MoneriumUser implements IPaymentUsers {
  private auth: MoneriumAuth = new MoneriumAuth();
  private api: ApiClient = new ApiClient();

  public async GetKYCUrl(returnUrl: string): Promise<any> {
    const {
      code_challenge,
      client_id,
      client_secret,
      auth_client_id,
      code_challenge_method,
      grant_type,
      redirect_uri,
    } = await this.auth.getConfigs();

    const authUrl = `${process.env.MONERIUM_API_HOST}/auth`;
    const authParams = new URLSearchParams({
      code_challenge,
      client_id: auth_client_id,
      code_challenge_method,
      redirect_uri: returnUrl || redirect_uri,
    });

    const fullUrl = authUrl + "?" + authParams;
    return fullUrl;
  }

  public async InitKYC(): Promise<any> {
    try {
      const {
        code_challenge,
        client_id,
        client_secret,
        auth_client_id,
        code_challenge_method,
        grant_type,
        redirect_uri,
      } = await this.auth.getConfigs();

      const authUrl = `${process.env.MONERIUM_API_HOST}/auth`;
      const authParams = new URLSearchParams({
        code_challenge,
        client_id: auth_client_id,
        code_challenge_method,
        redirect_uri,
      });

      const request = await this.api.get(authUrl, authParams, {});
      const { data } = request.data;

      const requestTwo = await this.api.post(
        authUrl,
        { client_id, client_secret, grant_type },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const dataTwo = requestTwo.data;

      return data;
    } catch (error) {
      throw error;
    }
  }
}
