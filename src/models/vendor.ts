import crypto from "crypto";
import { Model, model, Schema } from "mongoose";
import { IVendorModel } from "../../interfaces/modelInterfaces";
import { AddressSchema } from "./address";
import { number } from "prop-types";
export const VendorSchema: Schema = new Schema({
  address: AddressSchema,
  instagramAccessToken: String,
  instagramIdPage: String,
  phoneNumber: String,
  website: String,
  location: {
    lat: number,
    long: number
  }
  pinned: [String]
});

VendorSchema.methods.encryptToken = (token: string): string => {
  const key = crypto.scryptSync("Blah#Foo*Bar", "salt", 24);
  const iv = Buffer.alloc(16, 0);
  const myKey: crypto.Cipher = crypto.createCipheriv("aes-192-cbc", key, iv);
  let encStr = myKey.update(token, "utf8", "hex");
  encStr += myKey.final("hex");
  return encStr;
};

VendorSchema.methods.decryptToken = (encryptedToken: string): string => {
  const key = crypto.scryptSync("Blah#Foo*Bar", "salt", 24);
  const iv = Buffer.alloc(16, 0);
  const myKey = crypto.createDecipheriv("aes-192-cbc", key, iv);
  let clearStr = myKey.update(encryptedToken, "hex", "utf8");
  clearStr += myKey.final("utf8");
  return clearStr;
};

export const Vendor: Model<IVendorModel> = model<IVendorModel>("Vendor", VendorSchema);
