const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");
const userCtrl = require("../controllers/user");

//Routes User
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

router.put("/update/:id", auth, multer.users, userCtrl.modifyUser);
router.put("/modifyPassword/:id", auth, userCtrl.modifyPassword);

router.get("/", auth, userCtrl.getAllUsers);
router.get("/:id", auth, userCtrl.getOneUser);

router.delete("/:id", auth, userCtrl.deleteUser);

module.exports = router;




