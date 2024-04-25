// import express from express;
import bcrypt from "bcrypt";
import validateEmail from "../utils/emailvalidation.js";
import facultymodel from "../MongoModel/teachermodel.js";
import jwt from "jsonwebtoken";
import Attendance from "../MongoModel/AttendanceModel.js";

const signUpfaculty = async (req, res) => {
  try {
    // console.log("hiiz");
    const { username, email, password } = req.body;

    if (!validateEmail(email))
      return res.status(400).json({ message: "Invalid email address" });

    // console.log(validateEmail(email));
    const existingUser = await facultymodel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "Faculty already exists" });
    }
    // if (validatePassword(password))
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        res.status(400).json({ message: "Problem in encryption" });
      }
      console.log("hey");
      const result = await facultymodel.create({
        email: email,
        password: hash,
        username: username,
      });
      console.log(result);
    });

    return res.json({ message: "Account Creation Done" });
  } catch (error) {
    return res.status(500).json({ Error: true, Message: error });
  }
};

//login user code

const loginfaculty = async (req, res) => {
  const { username, password } = req.body;
  // console.log(req.body.password);
  try {
    const existingUser = await facultymodel.findOne({ username: username });
    if (!existingUser) {
      return res.status(400).json({ message: "Faculty not exists" });
    }
    // console.log(existingUser);
    const cheackpassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    // console.log(cheackpassword);
    //   if (existingUser.password == password) {
    //     cheackpassword = true;
    //   }
    //   console.log(cheackpassword);

    // if (cheackpassword != password) {
    //   res.status(500).json({ Error: true, Message: error });
    // }

    if (!cheackpassword) {
      return res.status(400).json({ message: "Password Incoorect" });
    }

    const token = jwt.sign(
      { username: existingUser.username, id: existingUser._id }, //payload
      process.env.SECRET_KEY,
      { expiresIn: "10m" }
    );
    return res
      .cookie("token", token)
      .status(200)
      .json({ message: "Logged in sucessfully", token: token, error: false });
  } catch (error) {
    return res.status(500).json({ Error: true, Message: error });
  }
};
const profileDetails = async (req, res) => {
  try {
    const user = await facultymodel.findOne({ username: req.username });
    console.log(user);

    return res
      .status(200)
      .json({ message: "Get teacher profile details", ProfileDetails: user });
  } catch (err) {
    console.log("hey");
    res.status(500).json({ Error: true, Message: err });
  }
};
const studentAttendance = async (req, res) => {
  // console.log(req.body);
  // console.log(Date.now());
  // const currentDate = new Date().toString();
  const currentDate = new Date().toISOString().slice(0, 10);

  // console.log(currentDate);
  const attendance = await Attendance.findOne({
    "RollNoSchema.RollNo": req.body.RollNo,
  });

  console.log(attendance);
  // console.log(req.body);
  if (attendance == null) {
    Attendance.create({
      RollNoSchema: {
        RollNo: req.body.RollNo,
      },
      StatusSchema: {
        Date: req.body.Date,
        present: req.body.present,
      },
    });
    // newuser.save().then(() => {
    //   console.log("data saved");
    // });
  } else {
    const finddata = await Attendance.findOne({
      "StatusSchema.Date": req.body.Date,
    });
    console.log(finddata);
    if (finddata != null) {
      // console.log("h");
      return res.status(400).json("Attendance of this day is marked");
    }
    await Attendance.updateOne(
      { "RollNoSchema.RollNo": req.body.RollNo },
      {
        $push: {
          StatusSchema: {
            Date: req.body.Date,
            present: req.body.present,
          },
        },
      }
    );
  }
  return res.status(200).json({ message: "Attendance Done" });
};
const viewAttendance = async (req, res) => {
  const Atendance = await Attendance.find({});
  console.log(Atendance);
  res.send(Atendance);
};

const user = {
  loginfaculty,
  signUpfaculty,
  profileDetails,
  studentAttendance,
  viewAttendance,
};
export default user;
