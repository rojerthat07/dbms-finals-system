const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
const { studentSchema, loginSchema } = require("../utils/validation-util");

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});
// const tokenSecret = process.env.TOKEN_SECRET;

const CREATE_STUDENT = async (req, res) => {
  try {
    let cleanedBody = await studentSchema
      .validateAsync(req.body)
      .catch((err) => {
        throw { statusCode: 400, message: err.message };
      });
    const {
      first_name,
      last_name,
      middle_name,
      school_ID,
      gender,
      date_of_birth,
      age,
      year_level,
      password,
      email,
      username,
    } = cleanedBody;

    const sql = `INSERT INTO students(first_name,last_name,middle_name,student_ID,gender,date_of_birth,age,year_level,occupation_ID)
      VALUES(?,?,?,?,?,?,?,?,?)`;
    const saveParams = [
      first_name,
      last_name,
      middle_name,
      school_ID,
      gender,
      date_of_birth,
      age,
      year_level,
      1,
    ];

    db.query(sql, saveParams, async (err, result) => {
      if (err)
        throw {
          statusCode: 500,
          message: "Something went wrong in creating student!",
        };
      console.log(result);
      const ID = result.insertId;

      //To make the password secure
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      let sql =
        "INSERT INTO students_accounts(email,username,student_ID,password)VALUES(?,?,?,?)";
      const saveParams = [email, username, ID, hashedPassword];
      await db.query(sql, saveParams, (err, result) => {
        console.log(err);
        if (err)
          throw {
            statusCode: 500,
            message: "Something went wrong in creating account!",
          };

        res.status(201).send({ message: result });
      });
    });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .send({ message: error.message || "Something went wrong" });
  }
};

const LOGIN_STUDENT = async (req, res) => {
  try {
    // let cleanedBody = await loginSchema.validateAsync(req.body).catch((err) => {
    //   throw { statusCode: 400, message: err.message };
    // });
    const { username, password, created_at, updated_at } = req.body;
    const sql = "Select * FROM students_accounts WHERE username LIKE(?)";
    const saveParams = [username]; // jercarlo07

    db.query(sql, saveParams, async (err, result) => {
      //Check if there is matched username
      if (result.length === 0) {
        res.status(401).send("WRONG USERNAME");
      }
      const isMatch = await bcrypt.compare(password, result[0].password);

      //Check if there is matched password
      if (!isMatch) {
        res.status(401).send("WRONG PASSWORD");
      }
      // res.status(200).send("Loginned");
      const payload = {
        admin: {
          result: result,
        },
      };
      //Create token when it passes the username and password test
      jwt.sign(payload, "SECRET", { expiresIn: 3600 }, async (err, token) => {
        if (err) {
          res.status(500).send("PROBLEM IN CREATING TOKEN");
        }

        //Send token to the cookies for authentication

        res.status(202).cookie("TC", token, {
          // sameSite: "strict",
          path: "/",
          httpOnly: true,
        });
      });
      const sqlLog =
        "INSERT INTO log_history(students_accounts_id,created_at,updated_at) VALUES(?,?,?);";
      const saveParamsLog = [result[0].ID, created_at, updated_at];

      await db.query(sqlLog, saveParamsLog, async (err, result) => {
        if (err)
          throw {
            statusCode: 500,
            message: "Something went wrong in creating student!",
          };

        res
          .cookie("LOGIN_ID", result.insertId)
          .send({ message: "Successfully loggined" });
      });
    });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .send({ message: error.message || "Something went wrong" });
  }
};

const LOGOUT_STUDENT = (req, res) => {
  try {
    res.clearCookie("TC");

    const LOGOUT_TIME = new Date().toString();
    const LOGIN_ID = req.cookies.LOGIN_ID;
    const sql =
      "UPDATE log_history SET updated_at = ? WHERE log_history.ID = ?";
    const saveParams = [LOGOUT_TIME, LOGIN_ID];

    db.query(sql, saveParams, (err, result) => {
      if (err) {
        res.status(500).send({ message: "There is problem in log out" });
      }
      res
        .status(202)
        .clearCookie("LOGIN_ID")
        .json({ message: "Successfully Logout" });
    });
  } catch (error) {
    console.log(error);
    res
      .status(error.statusCode || 500)
      .send({ message: error.message || "Something went wrong!" });
  }
};

const GET_PROFILE = (req, res) => {
  try {
    const { username, password } = req.body;
    // console.log(req.studentID);
    const sql = `Select * FROM students INNER JOIN occupations ON students.occupation_ID=occupations.ID WHERE students.occupation_ID='1' && students.ID = ${req.studentID}`;
    const saveParams = [req.studentID];
    // console.log(req);
    db.query(sql, saveParams, (err, result) => {
      if (err) {
        res.status(500).send({ message: "There is problem getting accounts" });
      }

      res.status(200).send({ result });
    });
  } catch (err) {
    res
      .status(error.statusCode || 500)
      .send({ message: error.message || "Something went wrong!" });
  }
};

module.exports = {
  CREATE_STUDENT,
  LOGIN_STUDENT,
  LOGOUT_STUDENT,
  GET_PROFILE,
};
