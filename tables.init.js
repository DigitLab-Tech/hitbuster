const mysql = require("mysql");
const tablesCreateStrings = [
  "CREATE TABLE IF NOT EXISTS Persons (PersonID int, LastName varchar(255), FirstName varchar(255), Address varchar(255), City varchar(255));",
];

const con = mysql.createConnection({
  host: "994.h.filess.io",
  user: "hitbuster_shoutbest",
  password: "fe08673832ccd4f783aba9ec51cf9c73eb8bf624",
  database: "hitbuster_shoutbest",
  port: 3305,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

for (const createString of tablesCreateStrings) {
  con.query(createString, function (error, results) {
    if (error) throw error;
    console.log(results);
  });
}

con.end();
