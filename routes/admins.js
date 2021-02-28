const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const AdminController = require("../controller//admins");

router.get("/get-reports", auth, AdminController.GET_REPORTS);
router.get("/get-logs", AdminController.GET_LOGS);
router.get("/get-accounts", AdminController.GET_ACCOUNTS);
router.post("/insert-admin", AdminController.CREATE_ADMIN);
router.post("/login-admin", AdminController.LOGIN_ADMIN);
router.post("/logout-admin", AdminController.LOGOUT_ADMIN);

module.exports = router;
