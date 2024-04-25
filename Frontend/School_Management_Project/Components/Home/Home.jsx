import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Home() {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const token = document.cookie.split("=")[1];
      if (token == undefined) {
        navigate("/login");
      }
      console.log(token);
      try {
        const response = await axios.get("/api/school/home", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(response.data.ProfileDetails);
        // console.log(document.cookie.split("=")[1]);
        //   console.log(localStorage.getItem("jwtToken"));
        setData(response.data.ProfileDetails);

        // await console.log(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  const markAttendance = (e) => {
    e.preventDefault();
    navigate("/attendance");
  };
  const viewAttendance = (e) => {
    e.preventDefault();
    navigate("/viewattendance");
  };
  const Signup = () => {
    navigate("/signup");
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div> Welcome {data.username}</div>
        <div
          className="btn"
          style={{ width: "20%", marginTop: "150px", marginLeft: "-110px" }}
        >
          <button onClick={markAttendance}> Mark Attendance</button>
          <button style={{ marginTop: "20px" }} onClick={viewAttendance}>
            {" "}
            View Attendance
          </button>
          <button style={{ marginTop: "20px" }} onClick={Signup}>
            {" "}
            Signup New Teacher
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;
