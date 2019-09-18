import { Document } from "mongoose";

export interface IAddressModel extends Document {
  country: string;
  state: string;
  street: string;
  streetNumber: string;
  streetSuffix: string;
  zipcode: string;
}

export interface IUserModel extends Document {
  email: string;
  favorites: string[];
  firstname: string;
  lastname: string;
  password: string;
  vendor: IVendorModel;
  isAuthenticated(): boolean;
}

export interface IVendorModel extends Document {
  address: IAddressModel;
  appSecretProof: string;
  instagramAccessToken: string;
  instagramIdPage: string;
  phoneNumber: string;
  pinned: string[];
  website: string;
  decryptToken(token: string): string;
  encryptToken(token: string): string;
}
