import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import expressJwt from "express-jwt";

const app = express();

// DB Models

// Middleware
app.use(express.static(__dirname + "/../../client/build/"));
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(cors());
dotenv.config();

// Controllers
import auth from "./controllers/v1/auth";
import instagram from "./controllers/v1/instagram";
import users from "./controllers/v1/users";
app.use("/v1/auth", expressJwt({
  secret: "thisIsASecret",
}).unless({
  path: [
    { url: '/v1/auth/login', methods: ['POST']},
    { url: '/v1/auth/signup', methods: ['POST']}
  ],
}), auth);
app.use("/v1/users",users);
app.use("/v1/instagram", instagram);

// 404 Catch-all route
app.get("*", (req, res) => {
  res.status(404).send({message: "Not Found"});
});

// Listener
app.listen(process.env.PORT || 3001, () => {
  // tslint:disable-next-line: no-console
  console.log("Listening on port", process.env.PORT || 3001);
});
