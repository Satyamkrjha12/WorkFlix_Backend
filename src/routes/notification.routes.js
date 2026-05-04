const express = require("express");
const router = express.Router();

const {
  getNotifications,
  markAsRead,
  markAllAsRead,
} = require("../controllers/notification.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.get("/getall", authMiddleware, getNotifications);
router.patch("/read/:id", authMiddleware, markAsRead);
router.patch("/readall", authMiddleware, markAllAsRead);

module.exports = router;
