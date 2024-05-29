import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const mysql = require("mysql");
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

console.log(mysql);

const con = mysql.createConnection({
  host: "994.h.filess.io",
  user: "hitbuster_shoutbest",
  password: "fe08673832ccd4f783aba9ec51cf9c73eb8bf624",
  database: "hitbuster_shoutbest",
  port: 3305,
});

con.connect(function (err: Error) {
  if (err) throw err;
  console.log("Connected!");
});

var sql =
  "CREATE TABLE Persons (PersonID int, LastName varchar(255), FirstName varchar(255), Address varchar(255), City varchar(255));";
con.query(sql, function (error: Error, results, fields) {
  if (error) throw error;
  console.log(results, fields);
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
