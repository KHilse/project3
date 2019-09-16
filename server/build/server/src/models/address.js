"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.AddressSchema = new mongoose_1.Schema({
    country: String,
    state: String,
    street: String,
    streetNumber: String,
    streetSuffix: String,
    zipcode: String,
});
exports.Address = mongoose_1.model("Address", exports.AddressSchema);
