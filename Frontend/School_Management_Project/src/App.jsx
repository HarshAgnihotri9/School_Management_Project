// import Attendance from "../../../Backend/MongoModel/AttendanceModel";
import AttendanceTracker from "../Components/Attendance/AttendanceTracker";
import Home from "../Components/Home/Home";
import Login from "../Components/Login/Login";
import Signup from "../Components/Signup/Signup";
import Appp from "../Components/ViewAttendance/Appp";
import "./App.css";
// import { Route, Router, Routes } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/Attendance" element={<AttendanceTracker />} />
          <Route path="/viewAttendance" element={<Appp />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
