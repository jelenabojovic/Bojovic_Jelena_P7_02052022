const multer = require("multer");

//types of the file

const MIME_TYPES_PROFILE = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const MIME_TYPES_POST = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
};
// Save user's photo to disk in the /images folder
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
//save post image in the /images folder
  const storagePosts = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "images/posts");
    },
    filename: (req, file, callback) => {
      const name = file.originalname.split(".")[0].split(" ").join("_");
      const extension = MIME_TYPES_POST[file.mimetype];
      callback(null, name + Date.now() + "." + extension);
    },
  });

  exports.users = multer({ storage: storageUsers }).single("avatar");
  exports.posts = multer({ storage: storagePosts }).single("image");