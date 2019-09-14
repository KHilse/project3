import { Document, Schema, Model, model } from "mongoose";
import { AddressSchema, IAddressModel } from "./address";

export interface IVendorModel extends Document {
  address: IAddressModel,
  phoneNumber: string,
  website: string
}

export const VendorSchema: Schema = new Schema({
  address: AddressSchema,
  phoneNumber: String,
  website: String,
});

export const Vendor: Model<IVendorModel> = model<IVendorModel>("Vendor", VendorSchema);