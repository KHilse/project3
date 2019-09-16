import bcrypt from "bcryptjs";
import { Schema, Model, model } from "mongoose";
import { VendorSchema } from "./vendor";
import { IUserModel } from '../../interfaces/modelInterfaces';

export const UserSchema = new Schema({
  email: {
    minLength: 5,
    required: true,
    type: String,
    unique: true,
    validate: {
      validator: (input: string): boolean => {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(input);
      },
    },
  },
  favorites: [String],
  firstname: {
		type: String,
		required: true,
		minlength: 2
	},
	lastname: String,
  password: {
    maxlength: 32,
    minLength: 8,
    required: true,
    type: String,
  },
  vendor: VendorSchema
});

UserSchema.pre<IUserModel>("save", function(next) {
  this.password = bcrypt.hashSync(this.password, 12);
  next();
});

UserSchema.set("toJSON", {
  transform: (doc, user) => {
    delete user.password;
    return user;
  },
});

UserSchema.methods.isAuthenticated = function(typedPassword: string): boolean {
  return bcrypt.compareSync(typedPassword, this.password);
};

export const User: Model<IUserModel>  = model<IUserModel>("User", UserSchema)
