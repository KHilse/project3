import { Document, Model, model, Schema } from "mongoose";
import { IAddress } from "../../interfaces/modelInterfaces";

export interface IAddressModel extends Document, IAddress {}

export const AddressSchema: Schema = new Schema({
  city: String,
  country: String,
  location: {},
  state: String,
  street: String,
  streetNumber: String,
  streetSuffix: String,
  zipcode: String,
});

export const Address: Model<IAddressModel> = model<IAddressModel>("Address", AddressSchema);
