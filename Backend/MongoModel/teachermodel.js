// const mongoose = require("mongoose");
import mongoose from "mongoose";
const schema = mongoose.Schema;

// const { encrypt, decrypt, key } = AES;

const facultySchema = new schema(
  {
    username: {
      type: String,
      require: true,
      // unique: true,
      index: true,
    },
    email: {
      type: String,
      require: true,
      // unique: true,
      index: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const faculty = mongoose.model("faculty", facultySchema);

// module.exports = User;
export default faculty;
