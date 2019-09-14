import { Document, Schema, Model, model } from "mongoose";

export interface IAddressModel extends Document {
  country: string,
  state: string,
  street: string,
  streetNumber: string,
  streetSuffix: string,
  zipcode: string,
}

export const AddressSchema: Schema = new Schema({
  country: String,
  state: String,
  street: String,
  streetNumber: String,
  streetSuffix: String,
  zipcode: String,
});

export const Address: Model<IAddressModel> = model<IAddressModel>("Address", AddressSchema);
