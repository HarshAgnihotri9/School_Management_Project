import { useState } from "react";
import "./Attendance.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AttendanceTracker() {
  const [rollNo, setRollNo] = useState("");
  const [date, setdate] = useState("");
  const [present, setpresent] = useState(false);
  const [data, setdata] = useState("");
  const [err, seterr] = useState("");
  const navigate = useNavigate();

  const handleclick = async (e) => {
    e.preventDefault();
    await axios
      .post("/api/school/attendance", {
        RollNo: rollNo,
        Date: date,
        present: present,
      })
      .then((response) => {
        console.log(response.data);
        console.log(date);
        if (response.data.message == "Attendance Done") {
          setdata(response.data.message);

          navigate("/attendance");
          setTimeout(() => {
            setdate("");
            setRollNo("");
            setdata("");
            setpresent(false);
          }, [3000]);
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        seterr(err.response.data);
        setTimeout(() => {
          seterr("");
        }, [2000]);
      });
  };

  return (
    <>
      <div className="container" style={{ display: "block", height: "600px" }}>
        <h2>Attendance of Student</h2>
        <form
          style={{
            backgroundColor: "white",
            height: "300px",
            marginTop: "90px",
          }}
          onSubmit={handleclick}
        >
          <div className="form-group">
            <label htmlFor="RollNo">RollNo:</label>
            <input
              type="text"
              id="RollNo"
              value={rollNo}
              placeholder="RollNo"
              name="RollNo"
              onChange={(e) => {
                setRollNo(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Date">Date:</label>
            <input
              type="Date"
              id="Date"
              value={date}
              placeholder="Date"
              name="Date"
              onChange={(e) => {
                setdate(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="present">present:</label>
            <input
              type="present"
              id="present"
              value={present}
              placeholder="present"
              name="present"
              onChange={(e) => {
                setpresent(e.target.value);
              }}
            />
          </div>

          <div className="form-group">
            <input type="submit" value="Submit" onClick={handleclick} />
          </div>
          {/* {/* <div style={{ color: "black" }}>{dataa.message}</div> */}
          <div style={{ color: "black" }}>{data}</div>
          <div style={{ color: "black" }}>{err}</div>
        </form>
      </div>
    </>
  );
}

export default AttendanceTracker;
