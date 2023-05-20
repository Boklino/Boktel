const multer = require('multer');

const storage = multer.diskStorage({
	filename: function (req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname);
	},
});

const fileFilter = (req, file, cb) => {
	if (file.mimetype === 'image/jpeg' || 'image/jpg' || 'image/png') {
		cb(null, true);
	} else {
		cb({ message: 'Unsupported file format' }, false);
	}
};

const upload = multer({
	storage: storage,
});

module.exports = upload;
