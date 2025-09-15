const express = require("express");
const router = express.Router();
const {
  getOverdueBookCount,
  getTotalUserAndBooksCount,
  getTotalAdminDetails,
  getOverdueBorrowersList,
  getTotalBorrowedAndReturnedBooks,
} = require("../controllers/adminDashboardController.js");

const {
  getAdminDetail,
  changeCredentials,
} = require("../controllers/adminAuthController.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

router.use(authMiddleware);

router.get("/detail", getAdminDetail);
router.get("/overdue-count", getOverdueBookCount);
router.post("/change-credentials", changeCredentials);
router.get("/counts", getTotalUserAndBooksCount);
router.get("/admins", getTotalAdminDetails);
router.get("/overdue-borrowers", getOverdueBorrowersList);
router.get("/borrowed-returned", getTotalBorrowedAndReturnedBooks);

module.exports = router;
