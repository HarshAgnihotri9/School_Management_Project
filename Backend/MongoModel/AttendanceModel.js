import mongoose from "mongoose";

const RollNoSchema = {
  RollNo: {
    type: String,
    required: true,
  },
  _id: false,
};

const StatusSchema = {
  Date: {
    type: String,
    // required: true,
  },
  present: {
    type: Boolean,
    required: true,
  },
};
const AttendanceSchema = new mongoose.Schema({
  RollNoSchema: {
    type: RollNoSchema,
  },
  StatusSchema: {
    type: [StatusSchema],
  },
});

const Attendance = mongoose.model("Application", AttendanceSchema);

export default Attendance;
