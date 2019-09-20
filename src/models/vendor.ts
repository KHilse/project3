import axios from "axios";
import crypto from "crypto";
import dotenv from "dotenv";
import { Document, Model, model, Schema } from "mongoose";
import { IVendor } from "../../interfaces/modelInterfaces";
import { AddressSchema, IAddressModel } from "./address";

dotenv.config();

export interface IVendorModel extends Document, IVendor {
  address: IAddressModel;
  appSecretProof: string;
  decryptToken(token: string): string;
  encryptToken(token: string): string;
  getLongLivedToken(appId: string, appSecret: string, token: string): string;
}

export const VendorSchema: Schema = new Schema({
  address: AddressSchema,
  appSecretProof: String,
  businessName: String,
  instagramAccessToken: String,
  instagramIdPage: String,
  phoneNumber: String,
  pinned: [String],
  website: String,
});

VendorSchema.pre<IVendorModel>("save", async function(next) {
  console.log(this.instagramAccessToken);
  if (process.env.APP_ID && process.env.APP_SECRET) {
    const url = `https://graph.facebook.com/v4.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${process.env.APP_ID}&client_secret=${process.env.APP_SECRET}&fb_exchange_token=${this.instagramAccessToken}`;
    await axios.get(url)
    .then((response) => {
      this.instagramAccessToken = response.data.access_token;
    })
    .catch((err) => {
      console.log(err, "Error getting long-lived token");
    });
    next();
  }
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
