import dotenv from "dotenv";
dotenv.config();
import cors from 'cors';
import express from 'express';
let app = express();


// DB Models


// Middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json({ limit: '10mb ' }));
app.use(cors());

// Controllers
import users from "./controllers/v1/users";
app.use("/v1/users", users);


// 404 Catch-all route
app.get("*", (req, res) => {
	res.status(404).send({ message: "Not found!" })
})


// Listener
app.listen(process.env.PORT || 3001, () => { console.log("Listening on port", process.env.PORT)});