import { ApiClient } from "@/utils/client";
import { DfnsWalletService } from "@/services/wallet/dfns/wallet.service";
import { Utils } from "@/utils";
import { MoneriumAuth } from "./auth";
import { MoneriumUser } from "./user";

require("dotenv").config();
const ethers = require("ethers");

const api = new ApiClient();
const dfns = new DfnsWalletService();
const auth = new MoneriumAuth();
const user = new MoneriumUser();

export class MoneriumAddress {
  private recidToBytes = (recid) => {
    if (recid == 0) {
      return "27";
    } else {
      return "28";
    }
  };

  public addAddressToMonerium = async () => {
    try {
      // const publicKey = await dfns.createPublicKey(false, 5, 3);
      // const publicKeyId = publicKey.data.id;

      // const publicKeyAddress = await dfns.getAddressForNetwork(
      //   publicKeyId,
      //   "ETH"
      // );

      const testkey = "pk-chicken-wyoming-83d3770136";
      const publicKeyAddress = await dfns.getAddressForNetwork(testkey, "ETH");
      // console.log(publicKeyAddress.data);

      const ethAddress = publicKeyAddress.address;
      // console.log(ethAddress);

      const message = "I hereby declare that I am the address owner.";
      // const hash = Utils.sha256(message);
      // const hash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(message));

      const hash = ethers.utils.hashMessage(message);

      // console.log(hash);

      // const signatureRS = await dfns.createSignature(publicKeyId, hash);
      const signatureRSV = await dfns.createSignature(testkey, hash);
      // console.log(signatureRSV.data);

      // const r = signatureRSV.data.r.replace("0x", "")
      // const s = signatureRSV.data.s.replace("0x", "")
      // const recid = signatureRSV.data.recid
      // console.log(r, r.length);
      // console.log(recid)
      // console.log(s, s.length);

      const byteRecid = this.recidToBytes(signatureRSV.recid);
      // console.log("test", byteRecid);

      // const string = `${r}${s}`
      // console.log(string)

      // // const signature = Buffer.from(`${signatureRSV.data.r.replace("0x", "")}${signatureRSV.data.s.replace("0x", "")}`, "hex");
      // const signature = Buffer.from(`${string}`, "hex")
      // console.log("Signature ", signature, signature.toString("hex"))

      // const splitSig = ethers.utils.splitSignature('0xed60287ada72d6cce26563f7588a8b74fcbc6ac50cec3cd3f47d5348bffe3c8c13483a682a1eb078508a2d2448843c1ca43edc3dac613cb6e0b47655e857ae1700')
      // console.log(splitSig)

      const expanded = {
        r: signatureRSV.r,
        s: signatureRSV.s,
        recoveryParam: signatureRSV.recid,
        v: byteRecid,
      };

      // const recoevered = ethers.utils.recoverAddress(hash, expanded);
      const sigEthers = ethers.utils.joinSignature(expanded);
      // console.log("Ethers Signature", sigEthers);

      // const verifiedAddress = ethers.utils.verifyMessage(message, sigEthers);
      // const verifiedAddress = ethers.utils.verifyMessage(message, "0xed60287ada72d6cce26563f7588a8b74fcbc6ac50cec3cd3f47d5348bffe3c8c13483a682a1eb078508a2d2448843c1ca43edc3dac613cb6e0b47655e857ae1700")
      // console.log("0xE5F959EF1D1D960D972774dCF35149CaB2655747", verifiedAddress)

      // const recoevered = ethers.utils.recoverAddress(hash, expanded);
      // console.log("Recovered:", recoevered);
      // console.log("expected:", ethAddress);
      // console.log("verified Address:", verifiedAddress);

      // const signatureR = Buffer.from(`${r}`, "hex");
      // console.log(signatureR)
      // const signatureS = Buffer.from(`${s}`, "hex");
      // console.log(signatureS)
      // const signatureV = Buffer.from(`${recid}`, "hex");
      // console.log("V buffer value", signatureV)

      // const arr = [signature, signatureV]
      // const sig = Buffer.concat(arr)
      // console.log(sig, sig.toString("hex"))

      // console.log(signature, signature.length);
      // console.log(signature.toString("hex"), signature.toString("hex").length);

      // const finalSignature = `${string}${byteRecid}`
      // // const finalSignature = `${signature.toString("hex")}${signatureRSV.data.recid}`
      // console.log(finalSignature, finalSignature.length)

      const payload = {
        address: ethAddress,
        message: message,
        signature: sigEthers,
        accounts: [
          {
            currency: "eur",
            chain: "ethereum",
            network: "mainnet",
          },
        ],
      };

      const token = await auth.getToken();
      console.log(token);

      const context = await auth.getContext(token);
      console.log("get context", context.data);

      const defaultProfile = context.data.defaultProfile;
      const userId = context.data.userId;
      // console.log('defaultProfile from context', context.data.defaultProfile)

      // const orders = await auth.getAllOrders(token);
      // console.log(orders.data)

      // const profile = await auth.getProfile(defaultProfile, token)
      // console.log('get profile', defaultProfile, profile.data)

      // const account = profile.data.accounts[1].id
      // console.log("account 0:", account)

      // const balance = await auth.getBalances(defaultProfile, token)
      // console.log(balance.data)

      const allBalances = await auth.getAllBalances(token);
      console.log(allBalances.data);

      // const addressUrl = `${process.env.MONERIUM_API_HOST}/profiles/${defaultProfile}/addresses`;
      const addressUrl = `https://api.monerium.dev/profiles/${userId}/addresses`;

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
