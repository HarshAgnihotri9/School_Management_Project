import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./Routes/Route.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/school", router);
console.log("hii");
app.get("/", (req, res) => {
  res.send("hiii everyone");
});
const port = process.env.PORT;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(port, () => {
      console.log("connected succesfully");
      console.log("Server started on port no. " + port);
    });
  })
  .catch((error) => {
    console.log(error);
  });
