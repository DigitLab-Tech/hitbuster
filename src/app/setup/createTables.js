const mysql = require("mysql");
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
