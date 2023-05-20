const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const imgDownload = require('image-downloader');
const User = require('./models/User.js');
const fs = require('fs');
const Place = require('./models/Place.js');

const Booking = require('./models/Booking.js');
const rename = require('fs');

const upload = require('./multer.js');
const cloudinary = require('./cloudinary.js');

const { resolve } = require('path');
require('dotenv').config();
const corsOptions = {
	origin: 'http://localhost:5173',
	credentials: true,
	optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(cookieParser());
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL);
app.use('/uploads', express.static(__dirname + '/uploads'));
const salt = bcrypt.genSaltSync(10);
const jwtSecret = 'asjgsohdjhoidhdfhdafhshss';

app.use(express.json());

app.get('/api/test', (req, res) => {
	res.json('zzdz');
});

app.post('/api/register', async (req, res) => {
	mongoose.connect(process.env.MONGO_URL);
	const { name, email, password } = req.body;
	try {
		const user = await User.create({
			name,
			email,
			password: bcrypt.hashSync(password, salt),
		});

		res.json(user);
	} catch (ex) {
		res.status(422).json(ex);
	}
});

app.post('/api/login', async (req, res) => {
	mongoose.connect(process.env.MONGO_URL);
	const { email, password, name } = req.body;
	const userDoc = await User.findOne({ email });
	if (userDoc) {
		const passOk = bcrypt.compareSync(password, userDoc.password);
		if (passOk) {
			jwt.sign(
				{
					email: userDoc.email,
					id: userDoc._id,
				},
				jwtSecret,
				{},
				(err, token) => {
					if (err) throw err;
					res.cookie('token', token).json(userDoc);
				}
			);
		} else {
			res.status(422).json('pass not ok');
		}
	} else {
		res.json('not found');
	}
});

app.post('/api/places', (req, res) => {
	mongoose.connect(process.env.MONGO_URL);
	const { token } = req.cookies;
	const {
		title,
		address,
		addedPhotos,
		description,
		perks,
		extraInfo,
		checkIn,
		checkOut,
		maxGuests,
		price,
	} = req.body;
	if (token) {
		jwt.verify(token, jwtSecret, {}, async (err, user) => {
			if (err) throw err;
			const place = await Place.create({
				owner: user.id,
				title,
				address,
				photos: addedPhotos,
				description,
				perks,
				extraInfo,
				checkIn,
				checkOut,
				maxGuests,
				price,
			});
			res.json(place);
		});
	}
});

app.get('/api//profile', (req, res) => {
	mongoose.connect(process.env.MONGO_URL);
	const { token } = req.cookies;
	if (token) {
		jwt.verify(token, jwtSecret, {}, async (err, user) => {
			if (err) throw err;
			const { name, email, _id } = await User.findById(user.id);
			res.json({ name, email, _id });
		});
	}
});

app.get('/api/user-places', (req, res) => {
	mongoose.connect(process.env.MONGO_URL);
	const { token } = req.cookies;
	if (token) {
		jwt.verify(token, jwtSecret, {}, async (err, user) => {
			if (err) throw err;
			const { id } = user;
			res.json(await Place.find({ owner: id }));
		});
	}
});

app.put('/api/places', async (req, res) => {
	mongoose.connect(process.env.MONGO_URL);
	const { token } = req.cookies;
	const {
		id,
		title,
		address,
		addedPhotos,
		description,
		perks,
		extraInfo,
		checkIn,
		checkOut,
		maxGuests,
		price,
	} = req.body;
	if (token) {
		jwt.verify(token, jwtSecret, {}, async (err, user) => {
			const place = await Place.findById(id);
			console.log(place.owner.toString());
			if (place.owner.toString() === user.id) {
				place.set({
					title,
					address,
					photos: addedPhotos,
					description,
					perks,
					extraInfo,
					checkIn,
					checkOut,
					maxGuests,
					price,
				});
				await place.save();
				res.json(place);
			}
		});
	}
});

app.get('/api/places/:id', async (req, res) => {
	mongoose.connect(process.env.MONGO_URL);
	const { id } = req.params;
	res.json(await Place.findById(id).populate('owner'));
});

app.get('/api/places', async (req, res) => {
	res.json(await Place.find());
});

app.post('/api/logout', (req, res) => {
	res.cookie('token', '').json(true);
});

app.post('/api/upload-link', async (req, res) => {
	mongoose.connect(process.env.MONGO_URL);

	try {
		const url = async (link) => await cloudinary.uploads(link, 'boktel');
		console.log({ url });
		const { link } = req.body;
		const newPath = await url(link);

		console.log({ newPath });
		res.json(newPath.url);
	} catch (e) {
		console.log(e);
		res.json(e);
	}
});

app.post('/api/upload', upload.array('photos', 50), async (req, res) => {
	mongoose.connect(process.env.MONGO_URL);
	const uploader = async (path) => await cloudinary.uploads(path, 'boktel');
	try {
		const urls = [];
		const files = req.files;
		console.log({ files });
		for (const file of files) {
			const { path } = file;
			const newPath = await uploader(path);
			console.log({ newPath });
			urls.push(newPath.url);
			fs.unlinkSync(path);
		}
		res.json(urls);
	} catch (e) {
		console.log(e);
		res.json(e);
	}
});

const getUserId = (req) => {
	mongoose.connect(process.env.MONGO_URL);
	return new Promise((resolve, reject) => {
		jwt.verify(req.cookies.token, jwtSecret, {}, async (err, user) => {
			if (err) throw err;
			resolve(user);
		});
	});
};

app.post('/api/bookings', async (req, res) => {
	mongoose.connect(process.env.MONGO_URL);
	const user = await getUserId(req);

	const { place, checkIn, checkOut, maxGuests, name, number, price } =
		req.body;

	try {
		const placeInfo = await Booking.create({
			place,
			checkIn,
			checkOut,
			maxGuests,
			name,
			number,
			price,
			user: user.id,
		});
		res.json(placeInfo);
	} catch (e) {
		res.status(422).json(e);
	}
});

app.get('/api/bookings', async (req, res) => {
	mongoose.connect(process.env.MONGO_URL);
	const user = await getUserId(req);
	console.log(user.id);
	try {
		const booking = await Booking.find({ user: user.id }).populate('place');
		console.log(booking);
		res.json(booking);
	} catch (e) {
		console.log(e);
		res.json(e);
	}
});

app.listen(4000);
