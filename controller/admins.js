const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
const { adminAccountSchema, loginSchema } = require("../utils/validation-util");

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

const CREATE_ADMIN = async (req, res) => {
  try {
    let cleanedBody = await adminAccountSchema
      .validateAsync(req.body)
      .catch((err) => {
        throw { statusCode: 400, message: err.message };
      });
    const {
      first_name,
      last_name,
      middle_name,
      password,
      email,
      username,
      specialization,
      department,
    } = cleanedBody;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const sql =
      "INSERT INTO admins_accounts(first_name,last_name,middle_name,occupation_ID,username,password,email,specialization,department)VALUES(?,?,?,?,?,?,?,?,?)";
    const saveParams = [
      first_name,
      last_name,
      middle_name,
      2,
      username,
      hashedPassword,
      email,
      specialization,
      department,
    ];
    await db.query(sql, saveParams, async (err, result) => {
      res.status(201).send({ message: "Successfullly Created an admin" });
    });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .send(error.message || "Something went wrong");
  }
};

const LOGIN_ADMIN = async (req, res) => {
  try {
    let cleanedBody = await loginSchema.validateAsync(req.body).catch((err) => {
      throw { statusCode: 400, message: err.message };
    });

    const { username, password } = cleanedBody;

    const sql = "Select * FROM admins_accounts WHERE username LIKE(?)";
    const saveParams = [username];

    db.query(sql, saveParams, async (err, result) => {
      // console.log(result[0]);
      //Check if there is matched username
      if (result.length === 0) {
        res.status(401).send({ message: "WRONG USERNAME" });
      }
      const isMatch = await bcrypt.compare(password, result[0].password);
      //Check if there is matched password
      if (!isMatch) {
        res.status(401).send({ message: "WRONG PASSWORD" });
      }
      res.cookie("details", result[0]);
      const payload = {
        admin: {
          result: result,
        },
      };
      //Create token when it passes the username and password test
      jwt.sign(payload, "SECRET", { expiresIn: 3600 }, (err, token) => {
        if (err) {
          res.status(500).send({ message: "CANNOT CREATE TOKEN" });
        }

        //Send token to the cookies for authentication
        res
          .status(202)
          .cookie("TC", token, {
            // sameSite: "strict",
            path: "/",
            httpOnly: true,
          })
          .send({ message: token, details: result })
          .catch((err) => {
            res.status(500).send({ message: "CANNOT CREATE TOKEN" });
          });
      });
    });
  } catch (error) {
    console.log(error);
    res
      .status(error.statusCode || 500)
      .send({ message: error.message || "Something went wrong" });
  }
};

const LOGOUT_ADMIN = async (req, res) => {
  //Clear the Cookie that has token
  try {
    await res
      .status(202)
      .clearCookie("TC")
      .send("User has been logout")
      .catch((err) => {
        throw { statusCode: 400, message: err };
      });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .send(error.message || "Something went wrong!");
  }
};

const GET_REPORTS = async (req, res) => {
  try {
    const sql =
      "Select * FROM students INNER JOIN occupations ON students.occupation_ID=occupations.ID WHERE students.occupation_ID='1'";

    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).send({ message: "There is problem getting reports" });
      }
      res.status(200).send({ result });
    });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .send({ message: error.message || "Something went wrong!" });
  }
};

const GET_ACCOUNTS = async (req, res) => {
  try {
    const sql = "Select * FROM students_accounts";

    db.query(sql, (err, result) => {
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

const GET_LOGS = async (req, res) => {
  try {
    const sql =
      "SELECT * FROM log_history INNER JOIN students_accounts INNER JOIN students WHERE log_history.students_accounts_id = students_accounts.ID && students_accounts_id = students.ID";

    db.query(sql, (err, result) => {
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
  GET_REPORTS,
  GET_ACCOUNTS,
  GET_LOGS,
  CREATE_ADMIN,
  LOGIN_ADMIN,
  LOGOUT_ADMIN,
};
