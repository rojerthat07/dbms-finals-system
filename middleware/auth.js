const jwt = require("jsonwebtoken");

const jwtSecret = "SECRET";

module.exports = function (req, res, next) {
  try {
    const token = req.cookies.TC;

    if (!token) {
      throw { statusCode: 403, message: "No token, authorization denied" };
    }

    const decoded = jwt.verify(token, jwtSecret);

    req.studentID = decoded.admin.result[0].ID;
    next();
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .send(error.message || "Something went wrong!");
  }
};
