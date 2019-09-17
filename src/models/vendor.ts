import { Schema, Model, model } from "mongoose";
import { AddressSchema } from "./address";
import { IVendorModel } from '../../interfaces/modelInterfaces';
import crypto from 'crypto';

export const VendorSchema: Schema = new Schema({
  address: AddressSchema,
  phoneNumber: String,
  website: String,
  instagramAccessToken: String,
  instagramIdPage: String
});

VendorSchema.methods.encryptToken = function (token: string) : string {
  const key = crypto.scryptSync('Blah#Foo*Bar', 'salt', 24);
  const iv = Buffer.alloc(16, 0);
  let myKey : crypto.Cipher = crypto.createCipheriv('aes-192-cbc', key, iv);  
  let encStr = myKey.update(token, "utf8", 'hex');
  encStr += myKey.final('hex');
  return encStr;
}

VendorSchema.methods.decryptToken = function (encryptedToken: string) : string {
  const key = crypto.scryptSync('Blah#Foo*Bar', 'salt', 24);
  const iv = Buffer.alloc(16, 0);
  let myKey = crypto.createDecipheriv('aes-192-cbc', key, iv);
  let clearStr = myKey.update(encryptedToken, 'hex', 'utf8');
  clearStr += myKey.final('utf8');
  return clearStr;
}

export const Vendor: Model<IVendorModel> = model<IVendorModel>("Vendor", VendorSchema);