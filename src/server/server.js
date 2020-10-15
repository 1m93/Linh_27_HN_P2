const jsonServer = require("json-server");
const auth = require("json-server-auth");
const cors = require("cors");
let multer = require("multer");

let storageAvatar = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "public/avatar");
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});
let storageCover = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "public/cover");
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});
let storageBanner = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "public/banner");
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});

let avatar = multer({ storage: storageAvatar }).single("file");
let cover = multer({ storage: storageCover }).single("file");
let banner = multer({ storage: storageBanner }).single("file");

const server = jsonServer.create();
const router = jsonServer.router("src/json/db.json");
const middlewares = jsonServer.defaults();

server.db = router.db;

server.post("/avatar", function (req, res) {
	avatar(req, res, function (err) {
		if (err instanceof multer.MulterError) {
			return res.status(500).json(err);
		} else if (err) {
			return res.status(500).json(err);
		}
		return res.status(200).send(req.file);
	});
});
server.post("/cover", function (req, res) {
	cover(req, res, function (err) {
		if (err instanceof multer.MulterError) {
			return res.status(500).json(err);
		} else if (err) {
			return res.status(500).json(err);
		}
		return res.status(200).send(req.file);
	});
});
server.post("/banner", function (req, res) {
	banner(req, res, function (err) {
		if (err instanceof multer.MulterError) {
			return res.status(500).json(err);
		} else if (err) {
			return res.status(500).json(err);
		}
		return res.status(200).send(req.file);
	});
});

server.use(cors());
server.use(auth);
server.use(avatar);
server.use(cover);
server.use(banner);
server.use(middlewares);
server.use(router);
server.listen(3001, () => {
	console.log("JSON Server is running");
});
