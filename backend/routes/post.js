const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const postCtrl = require("../controllers/post");
const multer = require("../middleware/multer-config");

router.get("/", postCtrl.getAllPosts);
router.post("/", auth, multer.posts, postCtrl.createPost);
router.get("/:id", postCtrl.getOnePost);
router.put("/:id", auth, multer.posts, postCtrl.modifyPost);
router.delete("/:id", auth, postCtrl.deletePost);

module.exports = router;