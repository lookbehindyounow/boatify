const express = require('express');
const ObjectId = require('mongodb').ObjectId;

const createRouter = function (collection) {

  const router = express.Router();

  router.get('/', (req, res) => {
    collection
      .find()
      .toArray()
      .then((docs) => res.json(docs))
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

  router.post("/", (req, res) => {
    const newUser = req.body;
    console.log(newUser);
    collection.insertOne(newUser).then((docs) => {
      res.json(docs.ops[0]);
    });
  });

  return router;
};

module.exports = createRouter;
