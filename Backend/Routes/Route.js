import express from "express";
import user from "../Controller/TeacherController.js";
import auth from "../middleware/Auth.js";
const {
  loginfaculty,
  signUpfaculty,
  profileDetails,
  studentAttendance,
  viewAttendance,
} = user;

const router = express.Router();

router.post("/signup", signUpfaculty);
router.post("/login", loginfaculty);
router.get("/home", auth, profileDetails);
router.post("/attendance", studentAttendance);
router.post("/viewattendance", viewAttendance);

export default router;
