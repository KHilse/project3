import { Model, model, Schema } from "mongoose";
import { IAddressModel } from "../../interfaces/modelInterfaces";

export const AddressSchema: Schema = new Schema({
  country: String,
  location: {},
  state: String,
  street: String,
  streetNumber: String,
  streetSuffix: String,
  zipcode: String,
});

export const Address: Model<IAddressModel> = model<IAddressModel>("Address", AddressSchema);
