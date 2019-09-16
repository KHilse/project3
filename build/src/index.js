"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
let app = express_1.default();
// DB Models
// Middleware
app.use(express_1.default.static(__dirname + '/../client/build/'));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json({ limit: '50mb ' }));
app.use(cors_1.default());
// Controllers
const users_1 = __importDefault(require("./controllers/v1/users"));
app.use("/v1/users", users_1.default);
// 404 Catch-all route
app.get("*", (req, res) => {
    res.sendFile("index.html");
});
// Listener
app.listen(process.env.PORT || 3001, () => { console.log("Listening on port", process.env.PORT); });
