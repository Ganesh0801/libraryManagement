const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController.js");
const authMiddleware = require("../middlewares/authMiddleware.js");
const {validateUser} = require("../middlewares/userValidate.js");

router.use(authMiddleware);

router.get("/", getAllUsers);
router.post("/", validateUser,addUser);
router.put("/:registrationNumber", updateUser);
router.delete("/:registrationNumber", deleteUser);

module.exports = router;
