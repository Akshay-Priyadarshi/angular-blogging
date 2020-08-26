//REQUIREMENTS
const express = require("express");
const router = express.Router();
const mongo = require("mongodb");
const md5 = require("md5");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//MONGO URI
const uri = "mongodb://localhost:27017/postDB" || process.env.DB_URI;

//REGISTER USER
router.post("/register", (req, res) => {
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: md5(req.body.password),
  };
  if (user) {
    mongo.connect(uri, (err, db) => {
      if (err) throw err;
      const mydb = db.db("postDB");
      mydb
        .collection("users")
        .findOne({ email: user.email }, (err, dataRecieved) => {
          if (err) throw err;
          if (dataRecieved == null) {
            mydb.collection("users").insertOne(user, (err, result) => {
              if (err) {
                res.status(200).json({
                  error: "User couldn't be Signed Up!",
                  message: "",
                  userCreated: null,
                });
                throw err;
              } else {
                if (result !== null) {
                  res.status(201).json({
                    error: "",
                    message: "User Signed Up successfully",
                    userCreated: result.ops[0],
                  });
                } else {
                  res.status(200).json({
                    error: "User couldn't be Signed Up!",
                    message: "",
                    userCreated: null,
                  });
                }
              }
            });
          } else {
            res.status(200).json({
              error: "This Email already exists!",
              message: "",
              userCreated: null,
            });
          }
        });
    });
  } else {
    res.status(200).json({
      error: "Could not create user!",
      message: "",
      userCreated: null,
    });
  }
});

//SIGNIN -Done
router.post("/signin", (req, res) => {
  const userEmailAndPassword = {
    email: req.body.email,
    password: md5(req.body.password),
  };
  if (userEmailAndPassword) {
    mongo.connect(uri, (err, db) => {
      if (err) throw err;
      const mydb = db.db("postDB");
      mydb
        .collection("users")
        .findOne({ email: userEmailAndPassword.email }, (err, result) => {
          if (err) {
            res.status(200).json({
              error: "Invalid Email/Password",
              message: "",
              loggedInUser: null,
              token: "",
            });
            throw err;
          } else {
            if (result !== null) {
              if (result.password === userEmailAndPassword.password) {
                const token = jwt.sign(
                  { userName: result.name, id: result._id },
                  "asdfghjklkjhgfdsa"
                );
                res.status(200).json({
                  error: "",
                  message: "Logged in successfully",
                  loggedInUser: {
                    firstName: result.firstName,
                    lastName: result.lastName,
                    id: result._id,
                  },
                  token: token,
                });
              } else {
                res.status(200).json({
                  error: "Invalid Email/Password",
                  message: "",
                  loggedInUser: null,
                  token: "",
                });
              }
            } else {
              res.status(200).json({
                error: "Invalid Email/Password",
                message: "",
                loggedInUser: null,
                token: "",
              });
            }
          }
        });
    });
  } else {
    res.status(200).json({
      error: "User couldn't be signed in!",
      message: "",
      loggedInUser: null,
      token: "",
    });
  }
});

//EXPORTING MODULE
module.exports = router;
