"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mongoose_1 = require("mongoose");
const vendor_1 = require("./vendor");
exports.UserSchema = new mongoose_1.Schema({
    email: {
        minLength: 5,
        required: true,
        type: String,
        unique: true,
        validate: {
            validator: (input) => {
                return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(input);
            },
        },
    },
    favorites: [String],
    firstname: {
        minlength: 2,
        required: true,
        type: String,
    },
    lastname: String,
    password: {
        maxlength: 32,
        minLength: 8,
        required: true,
        type: String,
    },
    vendor: vendor_1.VendorSchema,
});
exports.UserSchema.pre("save", function (next) {
    this.password = bcryptjs_1.default.hashSync(this.password, 12);
    next();
});
exports.UserSchema.set("toJSON", {
    transform: (doc, user) => {
        delete user.password;
        return user;
    },
});
exports.UserSchema.methods.isAuthenticated = function (typedPassword) {
    return bcryptjs_1.default.compareSync(typedPassword, this.password);
};
exports.User = mongoose_1.model("User", exports.UserSchema);
