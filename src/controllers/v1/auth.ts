import dotenv from "dotenv";
import express, { Router } from "express";
import jwt from "jsonwebtoken";
let db = require("../../models");

const router = express.Router();
dotenv.config();

router.post("/login", (req, res) => {
  db.User.findOne({email: req.body.email})
  .then((user) => {
    if (!user || !user.password) {
      return res.status(404).send({ message: "User not found"});
    }
    if ( !user.isAuthenticated(req.body.password)) {
      return res.status(406).send({ message: "Not Acceptable: Invalid Credentials!"});
    }
    const token = jwt.sign(user.toJSON(), "thisIsASecret", {
      expiresIn: 60 * 60 * 8,
    });
    res.send({ token });
  })
  .catch((err) => {
    console.log("Error in POST /auth/login", err);
    res.status(503).send({ message: "Something wrong, prob DB related. Or you made a type. One of those."});
  });
});

router.post("/signup", (req, res) => {
  console.log("HELLO");
  console.log(req.body);
  db.User.findOne({
    email: req.body.email,
  })
  .then((user) => {
    if (user) {
      return res.status(409).send({ message: "Email address in use "});
    }
    db.User.create({
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password,
      vendor: {
        instagramAccessToken: req.body.instagramAccessToken,
      },
    })
    .then((newUser) => {
      console.log("Making it here");
      const token = jwt.sign(newUser.toJSON(), "thisIsASecret", {
        expiresIn: 60 * 60 * 8,
      });
      res.send({ token });
    })
    .catch((err) => {
      console.log("Error when creating new user", err);
      res.status(500).send({ message: "Error creating user"});
    });
  })
  .catch((err) => {
    console.log("Error in POST /auth/signup", err);
    res.status(503).send({ message: "Something wrong, prob DB related. Or you made a typo. One of those." });
  });
});

router.get("/current/user", (req: any, res) => {
  console.log(req.user);
  if (!req.user || !req.user._id) {
    return res.status(417).send({ message: "Check configuration" });
  }
  res.send({ user: req.user });
});

export default router;
