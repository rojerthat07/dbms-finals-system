const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const StudentController = require("../controller/students");

router.post("/insert-student", StudentController.CREATE_STUDENT);
router.post("/login", StudentController.LOGIN_STUDENT);
router.post("/logout", StudentController.LOGOUT_STUDENT);
router.get("/get-profile", auth, StudentController.GET_PROFILE);

module.exports = router;
