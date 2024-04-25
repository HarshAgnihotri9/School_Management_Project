import { useState } from "react";
import "./Signup.css";
import axios from "axios";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setemail] = useState("");
  const [err, seterr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("/api/school/signup", {
        username: username,
        password: password,
        email: email,
      })
      .then(async (response) => {
        await console.log(response.data.Message);
        seterr(response.data.message);
        setTimeout(() => {
          seterr("");
          setPassword("");
          setUsername("");
          setemail("");
        }, [1000]);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        seterr(err.response.data.message);
        setTimeout(() => {
          seterr("");
          setPassword("");
          setUsername("");
          setemail("");
        }, [1000]);
      });
  };

  return (
    <div className="container">
      <form
        style={{ height: "600px" }}
        className="login-form"
        onSubmit={handleSubmit}
      >
        <h2>Signup</h2>
        <div className="input-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Signup</button>
        <div className="err">{err}</div>
      </form>
    </div>
  );
}

export default Signup;
