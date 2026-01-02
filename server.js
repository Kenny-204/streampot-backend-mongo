import app from "./app.js";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import mongoose from "mongoose";

const port = process.env.PORT;
const DB = process.env.DB_LOCAL;
app.set("query parser", "extended");
mongoose.connect(DB).then((con) => {});

app.listen(port, () => {
  console.log("server running at port 3000");
});
