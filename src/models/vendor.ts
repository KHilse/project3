import axios from "axios";
import crypto from "crypto";
import dotenv from "dotenv";
import { Model, model, Schema } from "mongoose";
import { IVendorModel } from "../../interfaces/modelInterfaces";
import { AddressSchema } from "./address";

dotenv.config();
export const VendorSchema: Schema = new Schema({
  address: AddressSchema,
  appSecretProof: String,
  instagramAccessToken: String,
  instagramIdPage: String,
  phoneNumber: String,
  pinned: [String],
  website: String,
  location: {},
});

VendorSchema.methods.encryptToken = (token: string): string => {
  const key = crypto.scryptSync(process.env.CRYPTO_KEY || "", "salt", 24);
  const iv = Buffer.alloc(16, 0);
  const myKey: crypto.Cipher = crypto.createCipheriv("aes-192-cbc", key, iv);
  let encStr = myKey.update(token, "utf8", "hex");
  encStr += myKey.final("hex");
  return encStr;
};

VendorSchema.methods.decryptToken = (encryptedToken: string): string => {
  const key = crypto.scryptSync(process.env.CRYPTO_KEY || "", "salt", 24);
  const iv = Buffer.alloc(16, 0);
  const myKey = crypto.createDecipheriv("aes-192-cbc", key, iv);
  let clearStr = myKey.update(encryptedToken, "hex", "utf8");
  clearStr += myKey.final("utf8");
  return clearStr;
};

VendorSchema.methods.getLongLivedToken = async (appId: string, appSecret: string, token: string) => {
  const url = `https://graph.facebook.com/v4.0/oauth/access_token?grant_type=fb_exchange_tokenclient_id=${appId}&client_secret=${appSecret}&fb_exchange_token=${token}`;
  const longLivedToken = await axios.get(url)
  .then((response) => {
    return response.data.access_token;
  })
  .catch((err) => {
    console.log(err, "Error getting long-lived token");
  });
  return longLivedToken;
};

export const Vendor: Model<IVendorModel> = model<IVendorModel>("Vendor", VendorSchema);
