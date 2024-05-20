import { ApiClient } from "@/utils/client";
import { DfnsWalletService } from "@/services/wallet/dfns/wallet.service";
import { Utils } from "@/utils";
import { MoneriumAuth } from "./auth";
import { MoneriumUser } from "./user";

require("dotenv").config();
import ethers from "ethers";

const api = new ApiClient();
const dfns = new DfnsWalletService();
const auth = new MoneriumAuth();

interface signatureInputValuesRequest {
  r: string;
  s: string;
  recoveryParam: number;
  v: number;
}

export class MoneriumAddress {
  private recidToBytes = (recid) => {
    if (recid == 0) {
      return 27;
    } else {
      return 28;
    }
  };

  public addAddressToMonerium = async (publicKey: string) => {
    try {
      const publicKeyAddress = await dfns.getAddressForNetwork(
        publicKey,
        "ETH"
      );
      const ethAddress = publicKeyAddress.address;

      const message = "I hereby declare that I am the address owner.";
      const hash = ethers.utils.hashMessage(message);

      const signatureRSV = await dfns.createSignature(publicKey, hash);

      const byteRecid = this.recidToBytes(signatureRSV.recid);

      const signatureInputValues: signatureInputValuesRequest = {
        r: signatureRSV.r,
        s: signatureRSV.s,
        recoveryParam: signatureRSV.recid,
        v: byteRecid,
      };

      const sigEthers = ethers.utils.joinSignature(signatureInputValues);

      const payload = {
        address: ethAddress,
        message: message,
        signature: sigEthers,
        accounts: [{ currency: "usd", chain: "polygon", network: "mumbai" }],
      };

      const token = await auth.getToken();

      const context = await auth.getContext(token);
      const defaultProfile = context.data.defaultProfile;

      const addressUrl = `${process.env.MONERIUM_API_HOST}/profiles/${defaultProfile}/addresses`;

      const headers = {
        Authorization: `Bearer ${token}`,
        "content-type": "Content-Type: application/json",
      };

      const request = await api.post(addressUrl, payload, { headers });

      return request;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}
