const mysql = require("mysql");

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

db.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log("MySql Connected");
  try {
    //THIS CREATE DATABASE
    const sqlDatabase = "CREATE DATABASE IF NOT EXISTS nodemysql";
    db.query(sqlDatabase, (err, result) => {
      if (err) {
        throw {
          statusCode: 500,
          message: "Problem in creating Database!",
        };
      }
    });

    //THIS Create Occupation Table
    const sqlOccupationTable =
      "CREATE TABLE IF NOT EXISTS occupations (ID int AUTO_INCREMENT,occupation_title varchar(30) UNIQUE,PRIMARY KEY (ID));";

    db.query(sqlOccupationTable, (err, result) => {
      //Inserting data to the occupation table
      if (result.warningCount === 0) {
        let sql = "INSERT INTO occupations(occupation_title)VALUES(?)";
        const DATAS = ["Student", "Teacher"];
        DATAS.map((data) => {
          db.query(sql, [data], (err, result) => {
            if (err)
              throw {
                statusCode: 500,
                message: "Something went wrong in creating occupation!",
              };
          });
        });
      }
      if (err) {
        throw {
          statusCode: 500,
          message: "Something went wrong in creating occupations Table!",
        };
      }
    });

    //THIS Create students Table
    const sqlStudentsTable =
      "CREATE TABLE IF NOT EXISTS students (ID int AUTO_INCREMENT,occupation_ID INT(5),student_ID INT(50),first_name varchar(55),last_name varchar(55),middle_name varchar(55),gender varchar(15),date_of_birth varchar(30),age INT(3),year_level varchar(20),PRIMARY KEY (ID),FOREIGN KEY (occupation_ID) REFERENCES occupations(ID));";

    db.query(sqlStudentsTable, (err, result) => {
      if (err) {
        console.log(err);
      }

      if (err) {
        throw {
          statusCode: 500,
          message: "Something went wrong in creating students Table!",
        };
      }
    });

    //THIS Create admins_accounts Table
    const sqlAdminsTable =
      "CREATE TABLE IF NOT EXISTS admins_accounts (ID int AUTO_INCREMENT,occupation_ID INT(5),first_name varchar(55),last_name varchar(55),middle_name varchar(55),username varchar(50),password CHAR(60),email varchar(50),specialization varchar(50),department varchar(50),PRIMARY KEY (ID),FOREIGN KEY (occupation_ID) REFERENCES occupations(ID));";

    db.query(sqlAdminsTable, (err, result) => {
      if (err) {
        throw {
          statusCode: 500,
          message: "PROBLEM IN CREATING admins_accounts TABLE",
        };
      }
    });

    //THIS Create students_accounts Table
    const sqlAccountTable =
      "CREATE TABLE IF NOT EXISTS students_accounts (ID int AUTO_INCREMENT,student_ID INT(50),email varchar(55),username varchar(55),password CHAR(60),PRIMARY KEY (ID), FOREIGN KEY (student_ID) REFERENCES students(ID));";

    db.query(sqlAccountTable, (err, result) => {
      if (err) {
        throw {
          statusCode: 500,
          message: "PROBLEM IN CREATING students_accounts TABLE",
        };
      }
    });

    //THIS Create log_history Table
    const sqlLogHistoryTable =
      "CREATE TABLE IF NOT EXISTS log_history (ID int AUTO_INCREMENT, students_accounts_id INT(20), created_at varchar(60), updated_at varchar(60), PRIMARY KEY (ID), FOREIGN KEY (students_accounts_id) REFERENCES students_accounts(ID));";

    db.query(sqlLogHistoryTable, (err, result) => {
      if (err) {
        console.log(err);
        throw {
          statusCode: 500,
          message: "Something went wrong in creating log_history Table!",
        };
      }
    });

    console.log("SUCCESSFULLY CREATED DATABASE AND TABLES");
  } catch (err) {
    console.log({ statusCode: err.statusCode, message: err.message });
  }
});

module.exports = db;
