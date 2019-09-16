import dotenv from "dotenv";
import cors from 'cors';
import express from "express";
let app = express();


// DB Models


// Middleware
app.use(express.static(__dirname + '/../../client/build/'));
app.use(express.urlencoded({ extended: false}));
app.use(express.json({ limit: '50mb ' }));
app.use(cors());

// Controllers
import users from "./controllers/v1/users";
app.use("/v1/users", users);


// 404 Catch-all route
app.get("*", (req, res) => {
	res.sendFile("index.html");
})


// Listener
app.listen(process.env.PORT || 3001, () => { console.log("Listening on port", process.env.PORT)});
