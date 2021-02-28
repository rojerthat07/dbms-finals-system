const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const initializedDb = require("./utils/db-initializer");
const path = require("path");

const app = express();

//Initialize Database and Tables
app.use((req, res, next) => {
  initializedDb;
  next();
});

//Middlewares
app.use(express.json());
app.use(cors({ credentials: true }));
app.use(cookieParser());

//Routes
const students = require("./routes/students");
const admins = require("./routes/admins");

//Routes and Controller Middleware
app.use("/api/student", students);
app.use("/api/admins", admins);

app.use(express.static(path.join(__dirname, "./dist")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "./dist", "index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});
