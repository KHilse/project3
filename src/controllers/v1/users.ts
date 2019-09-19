import express, { Application, Request, Response } from 'express';
const router = express.Router();
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'
dotenv.config();
let db = require('../../models');
import { IUserModel, IVendorModel } from '../../models';
import { UserSchema } from '../../models/user';

// TEST ROUTE
// This route doesn't do any db access, it just returns 50 fake users in an array
router.get('/testusers', (req, res) => {
	let firstNames: string[] = ['Abe', 'Ben', 'Catherine', 'Dale', 'Edgar', 'Fred', 'Gabe', 'Harry', 'Ignatz', 'Josh', 'Kobe'];
	let lastNames: string[] = ['Abner', 'Bova', 'Carlos', 'Dagner', 'Ellison', 'Flinstone', 'Gates', 'Hill', 'Ingle', 'Jefferies', 'Keller'];
	let faves: string[] = ['http://placekitten.com/50/50'];
	let result: {}[] = [];

	for (var i=0; i < 50; i++) {
		let first = firstNames[Math.floor(Math.random()*firstNames.length)];
		let last = lastNames[Math.floor(Math.random()*lastNames.length)];

		console.log(first,last);
		result.push({
			firstname: first,
			lastname: last,
			password: 'foo',
			email: 'abc@def.com',
			favorites: faves
		})
	}
	console.log(result);
	res.send(JSON.stringify(result));
})

// GET /v1/users
router.get('/', (req, res) => {
	db.User.find()
	.then(users => {
		res.send(users);
	})
	.catch(err => {
		console.log(err);
		res.status(503).send({ message: "Error! Can't get anything from the db" });
	})
})

// GET /v1/users/:id
router.get("/:id", (req, res) => {
	db.User.findById(req.params.id)
	.then(user => {
		if (user) {
		res.send(user);
		} else {
			res.status(404).send({ message: 'Resource not located'});
		}
	})
	.catch(err => {
		console.log(err);
		res.status(503).send({ message: 'ERROR finding user by id' });
	})
})

// POST /v1/users
router.post("/", (req, res) => {
	console.log(req.body);
	db.User.create(req.body)
	.then(newUser => {
		res.status(201).send(newUser);
	})
	.catch(err => {
		console.log(err.name);
		if (err.name === 'ValidationError') {
			console.log("ERROR: validation error while attempting to create user:", err);
			res.status(406).send({ message: 'Validation Error'});
		} else {
			console.log("ERROR: the database returned an error:", err);
			res.status(503).send({ message: 'Database or server error' });
		}
	})
})

router.post("/login", (req, res) => {
	db.User.findOne({ email: req.body.email })
	.then(user => {
		if ( !user || !user.password ) {
			res.status(404).send({ message: "User not Found"})
		}
		if (!user.isAuthenticated(req.body.password)){
			//Invalid Credentials wrong password
			return res.status(406).send({ message: 'Not Acceptable: Invalid Credentials' })

		}

		let token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 3
    })
    res.send({ token })
  })
	.catch(err => {
    console.log('Error in POST /auth/login', err)
    res.status(503).send({ message: 'Something wrong, prob DB related or you made a typo' })
  })
})

// PUT /v1/users/:id
router.put("/:id", (req, res) => {
	db.User.findOneAndUpdate({
		_id: req.params.id
	}, req.body,
		{ new: true }
	)
		.then(editedUser => {
			res.send(editedUser);
		})
		.catch(err => {
			console.log(err);
			res.status(503).send("ERROR editing user");
		})

})

// DELETE /v1/users (delete all)
router.delete("/", (req, res) => {
	db.User.deleteMany()
		.then(() => {
			res.send({ message: 'Deleted all records' });
		})
		.catch(err => {
			console.log(err);
			res.status(503).send({ message: 'Server error while deleting' });
		})
})

// DELETE /v1/users/:id (delete one)
router.delete("/:id", (req, res) => {
	db.User.findByIdAndDelete(req.params.id)
		.then(() => {
			res.status(204).send();
		})
		.catch(err => {
			console.log(err);
			res.status(503).send({ message: 'Server error while attempting delete' });
		})
})

// GET FAVORITE ARTISTS /v1/users/favoriteArtists
router.get('/:id/favoriteArtists', (req, res) => {
	db.User.findById(req.params.id)
		.then(user => {
			res.status(200).send(user.favoriteArtists);
		})
		.catch(err => {
			console.log(err);
			res.status(500).send({ message: 'Server error while attempting to find a user' });
		})
});

// POST FAVORITES ARTISTS /v1/users/:id/favoriteArtists/add
router.post('/:id/favoriteArtists/add', (req, res) => {
	db.User.findById(req.params.id)
	.then(user => {
		if (user) {
			let faves: [{artistId: string, postId: string}] = user.favoriteWorks;
			faves.push(req.body.newFave);
			user.updateOne({
				favoriteWorks: faves
			})
			.then(result => {
				res.status(200).send(result);
			})
			.catch(err => {
				console.log(err);
				res.status(500).send({ message: 'Server error while attempting to add a favorite'});
			})
		} else {
			res.status(500).send({ message: 'User not found for adding favorites'});
		}
	})
	.catch(err => {
		console.log(err);
		res.status(500).send({ message: 'Server error while attempting to find a user'});
	})
});

// DELETE FAVORITES ARTISTS /v1/users/:id/favoritesArtists/remove
router.delete('/:id/favoriteArtists/remove', (req, res) => {
	db.User.findById(req.params.id)
		.then(user => {
			let faves: string[] = user.favoriteArtists;
			let item: string = req.body.removePost;
			let itemIndex: number = faves.indexOf(item);
			if (itemIndex > -1) {
				faves.splice(itemIndex, 1);
				user.updateOne({
					favoriteWorks: faves
				})
				.then(result => {
					res.status(200).send(result);
				})
				.catch(err => {
					console.log(err);
					res.status(500).send({ message: 'Server error while attempting to add a favorite' });
				})
			}  else {
				res.status(500).send({ message: 'Couldn\'t find favorite to remove' });
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).send({ message: 'Server error while attempting to find a user' });
		})
});

// GET FAVORITE WORKS /v1/users/:id/favoriteWorks
router.get('/:id/favoriteWorks', (req, res) => {
	db.User.findById(req.params.id)
		.then(user => {
			res.status(200).send(user.favoriteWorks);
		})
		.catch(err => {
			console.log(err);
			res.status(500).send({ message: 'Server error while attempting to find a user' });
		})
});

// POST FAVORITE WORKS /v1/users/:id/favoriteWorks/add
router.post('/:id/favoriteWorks/add', (req, res) => {
	db.User.findById(req.params.id)
	.then(user => {
		if (user) {
			let faves: [{artistId: string, postId: string}] = user.favoriteWorks;
			faves.push(req.body.newFave);
			user.updateOne({
				favoriteWorks: faves
			})
			.then(result => {
				res.status(200).send(result);
			})
			.catch(err => {
				console.log(err);
				res.status(500).send({ message: 'Server error while attempting to add a favorite'});
			})
		} else {
			res.status(500).send({ message: 'User not found for adding favorites'});
		}
	})
	.catch(err => {
		console.log(err);
		res.status(500).send({ message: 'Server error while attempting to find a user'});
	})
});

// DELETE FAVORITE WORKS /v1/users/:id/favoriteWorks/remove
router.delete('/:id/favoriteWorks/remove', (req, res) => {
	db.User.findById(req.params.id)
		.then(user => {
			let faves: [{artistId: string, postId: string}] = user.favoriteWorks;
			let item: string = req.body.removePost;
			for (let i = 0; i < faves.length; i++) {
				if (faves[i].postId === item) {
					faves.splice(i, 1);
				} else {
					res.status(500).send({ message: 'Couldn\'t find favorite to remove' });
				}
			}
			user.updateOne({
				favoriteWorks: faves
			})
				.then(result => {
					res.status(200).send(result);
				})
				.catch(err => {
					console.log(err);
					res.status(500).send({ message: 'Server error while attempting to add a favorite' });
				})
		})
		.catch(err => {
			console.log(err);
			res.status(500).send({ message: 'Server error while attempting to find a user' });
		})
});

// GET PINNED /v1/users/:id/pinned
router.get('/:id/pinned', (req, res) => {
	db.User.findById(req.params.id)
		.then(user => {
			res.status(200).send(user.vendor.pinned);
		})
		.catch(err => {
			console.log(err);
			res.status(500).send({ message: 'Server error while attempting to find a user' });
		})
})

// POST PINNED /v1/users/:id/pinned/add
router.post('/:id/pinned/add', (req, res) => {
	db.User.findById(req.params.id)
	.then(user => {
		if (user) {
			let pins : string[] = user.vendor.pinned;
			pins.push(req.body.newFave);
			user.updateOne({
				vendor: {
					pinned: pins
				}
			})
			.then(result => {
				res.status(200).send(result);
			})
			.catch(err => {
				console.log(err);
				res.status(500).send({ message: 'Server error while attempting to add a pinned item'});
			})
		} else {
			res.status(500).send({ message: 'User not found for adding pinned items'});
		}
	})
	.catch(err => {
		console.log(err);
		res.status(500).send({ message: 'Server error while attempting to find a user'});
	})
})

// DELETE PINNED /v1/users/:id/pinned/remove
router.delete('/:id/pinned/remove', (req, res) => {
	db.User.findById(req.params.id)
		.then(user => {
			let pins: string[] = user.vendor.pinned;
			let item: string = req.body.removePost;
			let itemIndex: number = pins.indexOf(item);
			if (itemIndex > -1) {
				pins.splice(itemIndex, 1);
				user.updateOne({
					vendor: {
						pinned: pins
					}
				})
					.then(result => {
						res.status(200).send(result);
					})
					.catch(err => {
						console.log(err);
						res.status(500).send({ message: 'Server error while attempting to add a favorite' });
					})
			} else {
				res.status(500).send({ message: 'Couldn\'t find favorite to remove' });
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).send({ message: 'Server error while attempting to find a user' });
		})
})


export default router;
