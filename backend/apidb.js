//REQUIREMENTS
const express = require("express");
const router = express.Router();
const mongo = require("mongodb");
require("dotenv").config();

//MONGO URI
const uri = "mongodb://localhost:27017/postDB" || process.env.DB_URI;

//GET POSTS -Done
router.get("/getposts", (req, res) => {
  mongo.connect(uri, (err, db) => {
    if (err) throw err;
    const mydb = db.db("postDB");
    mydb
      .collection("posts")
      .find()
      .toArray((err, result) => {
        res.status(200).json({
          message: "Post successfully fetched",
          postArray: result,
        });
      });
  });
});

//CREATE NEW POST
router.post("/post", (req, res) => {
  const post = {
    postTitle: req.body.postTitle,
    postDesc: req.body.postDesc,
    createdAt: req.body.createdAt,
  };
  if (post) {
    mongo.connect(uri, (err, db) => {
      if (err) throw err;
      const mydb = db.db("postDB");
      mydb.collection("posts").insertOne(post, (err, result) => {
        if (err) throw err;
        res.status(201).json({
          message: "Post successfully saved",
          postSaved: result.ops[0],
        });
      });
    });
  } else {
    res.status(300).json({ error: "Post couldn't be saved!" });
  }
});

//UPDATING POST -Done
router.put("/updatepost", (req, res) => {
  const idToBeUpdated = req.body.postId;
  const updatedPost = {
    $set: {
      postTitle: req.body.postTitle,
      postDesc: req.body.postDesc,
      createdAt: req.body.createdAt,
    },
  };
  if (idToBeUpdated) {
    mongo.connect(uri, (err, db) => {
      if (err) throw err;
      const mydb = db.db("postDB");
      mydb
        .collection("posts")
        .updateOne(
          { _id: mongo.ObjectID(idToBeUpdated) },
          updatedPost,
          (err, result) => {
            if (err) throw err;
            res.status(201).json({
              message: "Post successfully updated",
              postUpdated: result,
            });
          }
        );
    });
  } else {
    res.status(300).json({ error: "Post couldn't be updated!" });
  }
});

//DELETING POST -Done
router.delete("/deletepost", (req, res) => {
  const idToBeDeleted = req.body.postId;
  if (idToBeDeleted) {
    mongo.connect(uri, (err, db) => {
      if (err) throw err;
      const mydb = db.db("postDB");
      mydb
        .collection("posts")
        .deleteOne({ _id: mongo.ObjectID(idToBeDeleted) }, (err, result) => {
          if (err) throw err;
          res.status(201).json({
            message: "Post successfully Deleted",
            postDeleted: result,
          });
        });
    });
  } else {
    res.status(300).json({ error: "Post couldn't be deleted!" });
  }
});

//Getting Post by ID -Done
router.post("/getpostbyid", (req, res) => {
  const idToBeFound = req.body.postId;
  if (idToBeFound) {
    mongo.connect(uri, (err, db) => {
      if (err) throw err;
      const mydb = db.db("postDB");
      mydb
        .collection("posts")
        .find({ _id: mongo.ObjectID(idToBeFound) })
        .toArray((err, result) => {
          res.status(200).json({
            message: "Post successfully fetched",
            postSelected: result[0],
          });
        });
    });
  } else {
    res.status(300).json({ error: "Post couldn't be found!" });
  }
});

//EXPORTING MODULE
module.exports = router;
