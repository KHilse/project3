import mongoose from "mongoose";
import { Address, IAddressModel } from "./address";
import { IUserModel, User } from "./user";
import { IVendorModel, Vendor } from "./vendor";

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/InkTrail", {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export { Address, IAddressModel, IUserModel, IVendorModel, User, Vendor };
