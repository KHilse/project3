"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let db = require('../../models');
// GET /v1/users
router.get('/', (req, res) => {
    db.User.find()
        .then(users => {
        res.send(users);
    })
        .catch(err => {
        console.log(err);
        res.status(503).send({ message: "Error! Can't get anything from the db" });
    });
});
// TEST ROUTE
router.get('/testusers', (req, res) => {
    let firstNames = ['Abe', 'Ben', 'Catherine', 'Dale', 'Edgar', 'Fred', 'Gabe', 'Harry', 'Ignatz', 'Josh', 'Kobe'];
    let lastNames = ['Abner', 'Bova', 'Carlos', 'Dagner', 'Ellison', 'Flinstone', 'Gates', 'Hill', 'Ingle', 'Jefferies', 'Keller'];
    let faves = ['http://placekitten.com/50/50'];
    let result = [];
    for (var i = 0; i < 50; i++) {
        let first = firstNames[Math.floor(Math.random() * firstNames.length)];
        let last = lastNames[Math.floor(Math.random() * lastNames.length)];
        console.log(first, last);
        result.push({
            firstname: first,
            lastname: last,
            password: 'foo',
            email: 'abc@def.com',
            favorites: faves
        });
    }
    console.log(result);
    res.send(JSON.stringify(result));
});
// GET /v1/users/:id
router.get("/:id", (req, res) => {
    db.User.findById(req.params.id)
        .then(user => {
        if (user) {
            res.send(user);
        }
        else {
            res.status(404).send({ message: 'Resource not located' });
        }
    })
        .catch(err => {
        console.log(err);
        res.status(503).send({ message: 'ERROR finding user by id' });
    });
});
// POST /v1/users
router.post("/", (req, res) => {
    db.User.create(req.body)
        .then(newUser => {
        res.status(201).send(newUser);
    })
        .catch(err => {
        console.log(err.name);
        if (err.name === 'ValidationError') {
            res.status(406).send({ message: 'Validation Error' });
        }
        else {
            res.status(503).send({ message: 'Database or server error' });
        }
    });
});
// PUT /v1/users/:id
router.put("/:id", (req, res) => {
    db.User.findOneAndUpdate({
        _id: req.params.id
    }, req.body, { new: true })
        .then(editedUser => {
        res.send(editedUser);
    })
        .catch(err => {
        console.log(err);
        res.status(503).send("ERROR editing user");
    });
});
// DELETE /v1/users (delete all)
router.delete("/", (req, res) => {
    db.User.deleteMany()
        .then(() => {
        res.send({ message: 'Deleted all records' });
    })
        .catch(err => {
        console.log(err);
        res.status(503).send({ message: 'Server error while deleting' });
    });
});
// DELETE /v1/users/:id (delete one)
router.delete("/:id", (req, res) => {
    db.User.findByIdAndDelete(req.params.id)
        .then(() => {
        res.status(204).send();
    })
        .catch(err => {
        console.log(err);
        res.status(503).send({ message: 'Server error while attempting delete' });
    });
});
exports.default = router;
