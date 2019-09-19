export interface IAddress {
  city: string;
  country: string;
  geoLocation: {};
  state: string;
  street: string;
  streetNumber: string;
  streetSuffix: string;
  zipcode: string;
}

export interface IUser {
  email: string;
  favorites: string[];
  firstname: string;
  lastname: string;
  password: string;
  vendor: IVendor;
}

export interface IVendor {
  address: IAddress;
  businessName: string;
  instagramAccessToken: string;
  instagramIdPage: string;
  phoneNumber: string;
  pinned: string[];
  website: string;
}
