import React from "react";

function AttendanceTable({ data }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Roll No</th>
          <th>Date</th>
          <th>Present</th>
        </tr>
      </thead>
      <tbody>
        {data.map((student, index) =>
          student.StatusSchema.map((status, idx) => (
            <tr key={`${index}-${idx}`}>
              <td>{student.RollNoSchema.RollNo}</td>
              <td>{status.Date}</td>
              <td>{status.present ? "Present" : "Absent"}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default AttendanceTable;
