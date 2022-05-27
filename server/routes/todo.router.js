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
    SELECT * FROM todos
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

module.exports = router;
