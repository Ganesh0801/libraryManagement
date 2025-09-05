const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  addUser,
  deleteUser,
  updateUser,
} = require("../controllers/userController.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

router.use(authMiddleware);

router.get("/", getAllUsers);
router.post("/", addUser);
router.delete("/:registrationNumber", deleteUser);
router.put("/:registrationNumber", updateUser);

module.exports = router;
