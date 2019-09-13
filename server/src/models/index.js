require("dotenv");
let mongoose = require("mongoose");

// MongoDB connection string
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/inktrail", {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

module.exports.User = require("./user");