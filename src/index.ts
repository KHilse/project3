import cors from "cors";
import dotenv from "dotenv";
import express from "express";

const app = express();

// DB Models

// Middleware
app.use(express.static(__dirname + "/../../client/build/"));
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(cors());
dotenv.config();

// Controllers
import users from "./controllers/v1/users";
app.use("/v1/users", users);

// 404 Catch-all route
app.get("*", (req, res) => {
  res.sendFile("index.html");
});

// Listener
app.listen(process.env.PORT || 3001, () => {
  // tslint:disable-next-line: no-console
  console.log("Listening on port", process.env.PORT || 3001);
});
