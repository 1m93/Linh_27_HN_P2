const jsonServer = require("json-server");
const auth = require("json-server-auth");
const cors = require("cors");
var multer = require("multer");

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "public/avatar");
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});

var avatar = multer({ storage: storage }).single("file");

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

server.use(cors());
server.use(auth);
server.use(avatar);
server.use(middlewares);
server.use(router);
server.listen(3001, () => {
	console.log("JSON Server is running");
});
