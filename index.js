const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const pool = require("./db");
const path = require("path");
require("dotenv").config();

const port = process.env.PORT || 8000;
const app = express();
app.use(cors());
app.use(bodyParser.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

app.get("/api/bets", async (req, res) => {
  const { statType, statTypeSelection, xAxis, yAxis } = req.query;

  try {
    const bets = await pool.query(
      `SELECT ${xAxis}, ${yAxis} FROM bet
        WHERE stat_type='${statType}' ${
        statTypeSelection && `AND selection='${statTypeSelection}'`
      }
        ORDER BY accepted_datetime_utc ASC`
    );

    return res.json(bets.rows);
  } catch (error) {
    console.error(error);
  }
});

app.get("/api/bets/highlights", async (req, res) => {
  const { statType, statTypeSelection, yAxis } = req.query;

  try {
    const highlights = await pool.query(
      `SELECT AVG(${yAxis}), MIN(${yAxis}), MAX(${yAxis}) FROM bet
        WHERE stat_type='${statType}'  ${
        statTypeSelection && `AND selection='${statTypeSelection}'`
      }`
    );

    let results = highlights.rows[0];
    const entries = Object.entries(results);

    entries.forEach((entry) => {
      const key = entry[0];
      const value = entry[1];
      let newValue = value >= 0.05 ? "+" + value.toFixed(1) : value.toFixed(1);

      results[key] = newValue;
    });

    return res.json(results);
  } catch (error) {
    console.error(error);
  }
});

app.get("*", (req, res) => {
  return res.sendFile(path.join(__dirname, "client/build/index.html"));
})

app.listen(port);
