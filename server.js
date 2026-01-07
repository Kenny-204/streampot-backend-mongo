import app from "./app.js";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import mongoose from "mongoose";

const port = process.env.PORT;
// const DB = process.env.DB_LOCAL;
const DB = process.env.DB;
app.set("query parser", "extended");
// mongoose.connect(DB).then((con) => {});

mongoose.connect(DB)
.then(() => console.log("DB connected to Atlas!"))
.catch(err => console.error("DB connection error:", err));

app.listen(port, () => {
  console.log("server running at port 3000");
});
