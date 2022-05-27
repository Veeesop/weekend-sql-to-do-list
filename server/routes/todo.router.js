const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

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
//post router

module.exports = router;
