const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

//post router
router.post("/", (req, res) => {
  console.log(req.body);
  const sqlQuery = `
    INSERT INTO "todos" (task)
    VALUES ($1);
    `;
  const sqlParams = [req.body.task];
  pool
    .query(sqlQuery, sqlParams)
    .then(() => {
      console.log("put success");
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("Dummy...", err);
      res.sendStatus(500);
    });
});

//get router
router.get("/", (req, res) => {
  const sqlQuery = `
    SELECT * FROM todos ORDER BY id
    `;
  pool
    .query(sqlQuery)
    .then((dbRes) => {
      console.log(dbRes.rows);
      res.send(dbRes.rows);
    })
    .catch((err) => {
      console.log("Shit..", err);
    });
});
//delete router
router.delete("/:id", (req, res) => {
  const sqlQuery = `
    DELETE FROM "todos"
    WHERE id = $1;
    `;
  const sqlParams = [req.params.id];
  pool
    .query(sqlQuery, sqlParams)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("Bullock...", err);
    });
});

//Put router
router.put("/:id", (req, res) => {
  let id = req.params.id;
  let complete = req.body.complete;
  const sqlQuery = `
    UPDATE "todos"
    SET "complete" = $1
    WHERE id = $2;
  `;
  const sqlParams = [complete, id];

  pool
    .query(sqlQuery, sqlParams)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("Idiot...", err);
      res.sendStatus(500);
    });
});

module.exports = router;
