import { Schema, Model, model } from "mongoose";
import { AddressSchema } from "./address";
import { IVendorModel } from '../../interfaces/modelInterfaces';

export const VendorSchema: Schema = new Schema({
  address: AddressSchema,
  phoneNumber: String,
  website: String,
  instagramAccessToken: String
});

VendorSchema.methods.encryptToken = function (token: String) : String {
  // TODO Add encryption method
  return '';
}

export const Vendor: Model<IVendorModel> = model<IVendorModel>("Vendor", VendorSchema);