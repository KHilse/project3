import { Document } from "mongoose";

export interface IAddressModel extends Document {
  country: string,
  state: string,
  street: string,
  streetNumber: string,
  streetSuffix: string,
  zipcode: string,
}

export interface IUserModel extends Document {
  email: string,
  favorites: string[],
  lastname: string,
  isAuthenticated(): boolean,
  password: string,
  vendor: IVendorModel
}

export interface IVendorModel extends Document {
  address: IAddressModel,
  phoneNumber: string,
  website: string
}