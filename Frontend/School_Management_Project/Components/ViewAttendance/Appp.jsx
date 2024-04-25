import { useEffect, useState } from "react";
// import AttendanceTable from "../ViewAttendance/ViewAttendance.js"; // Import your AttendanceTable component
import axios from "axios";
import "./Appp.css";

function AttendanceTable({ data }) {
  // Extract all unique dates from the data
  const allDates = [
    ...new Set(
      data.flatMap((student) =>
        student.StatusSchema.map((status) => status.Date)
      )
    ),
  ];

  return (
    <table>
      <thead>
        <tr>
          <th>Roll No</th>
          {allDates.map((date) => (
            <th key={date}>{date}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((student, index) => (
          <tr key={index}>
            <td>{student.RollNoSchema.RollNo}</td>
            {allDates.map((date) => {
              // Check if the date exists in the student's attendance records
              const status = student.StatusSchema.find(
                (status) => status.Date === date
              );
              return (
                <td key={date}>
                  {status ? (status.present ? "Present" : "Absent") : "Absent"}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Appp() {
  const [data, setdata] = useState(null);
  useEffect(() => {
    (async () => {
      await axios.post("/api/school/viewAttendance").then(async (res) => {
        console.log(res.data);
        await setdata(res.data);
        // console.log(data);
      });
    })();
  }, []);
  if (data != null) {
    return (
      <div>
        <h1>Student Attendance</h1>
        <AttendanceTable data={data} />
      </div>
    );
  }
}

export default Appp;
