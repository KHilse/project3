"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const address_1 = require("./address");
exports.VendorSchema = new mongoose_1.Schema({
    address: address_1.AddressSchema,
    phoneNumber: String,
    website: String,
});
exports.Vendor = mongoose_1.model("Vendor", exports.VendorSchema);
