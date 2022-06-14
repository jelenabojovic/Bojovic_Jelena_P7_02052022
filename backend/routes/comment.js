const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const commentCtrl = require("../controllers/comment");

//Routes Comment
router.get("/:id", commentCtrl.getAllComments);
router.post("/", auth, commentCtrl.createComment);
router.put("/:id", auth,  commentCtrl.modifyComment);
router.delete("/:id", auth, commentCtrl.deleteComment);


module.exports = router;