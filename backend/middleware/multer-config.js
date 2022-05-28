const multer = require("multer");

const MIME_TYPES_PROFILE = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storageUsers = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "images/users");
    },
    filename: (req, file, callback) => {
      const name = file.originalname.split(".")[0].split(" ").join("_");
      const extension = MIME_TYPES_PROFILE[file.mimetype];
      callback(null, name + Date.now() + "." + extension);
    },
  });

  exports.users = multer({ storage: storageUsers }).single("image");