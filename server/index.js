const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "crud_family",

});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const sqlGet = "SELECT * FROM family_db";
  db.query(sqlGet, (error, result) => {
    res.send(result);
  });
});

app.post("/api/post", (req, res) => {
  const { lname, quantity, members_name } = req.body;
  const sqlInsert =
    "INSERT INTO family_db (lname, quantity, members_name) VALUES (?, ?, ?)";
  db.query(sqlInsert, [lname, quantity, members_name], (error, result) => {
    if (error) {
      console.log(error);
    }
  });
});

app.delete("/api/remove/:id", (req, res) => {
  const { id } = req.params;
  const sqlRemove = "DELETE FROM family_db WHERE id = ?";
  db.query(sqlRemove, id, (error, result) => {
    if (error) {
      console.log(error);
    }
  });
});

app.get("/api/get/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet = "SELECT * FROM family_db WHERE id = ?";
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

app.put("/api/update/:id", (req, res) => {
    const { id } = req.params;
    const {lname, quantity, members_name} = req.body;
    const sqlUpdate = "UPDATE family_db SET lname = ?, quantity = ?, members_name = ? WHERE id = ?";
    db.query(sqlUpdate, [lname, quantity, members_name, id], (error, result) => {
      if (error) {
        console.log(error);
      }
      res.send(result);
    });
  });

app.get("/", (req, res) => {
    // const sqlInsert = "INSERT INTO crud_family.family_db (lname, quantity, members_name) VALUES ('Quijanos', '4', 'nino')";


    //     db.query(sqlInsert, (err, result) => {
    //         console.log("error", err);
    //         console.log("result", result);
    //         res.send("Hello Express!");
        
    // });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

