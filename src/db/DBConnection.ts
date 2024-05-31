import mysql from "mysql2/promise";

let instance: DBConnection;

class DBConnection {
  connection: mysql.Connection | null;

  constructor() {
    if (instance) {
      throw new Error("New instance cannot be created.");
    }

    instance = this;

    this.connection = null;
  }

  async execute(query: string) {
    try {
      const connection = await this.connect();

      if (connection) {
        const result = await connection.execute(query);

        await connection.end();

        return result;
      }
    } catch (err) {
      console.log(err);
    }

    return null;
  }

  async connect() {
    if (!this.connection) {
      try {
        this.connection = await mysql.createConnection({
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          database: process.env.DB_DATABASE,
          port: parseInt(process.env.DB_PORT ?? "3306"),
          password: process.env.DB_PASSWORD,
        });
      } catch (err) {
        console.log(err);
      }
    }
    return this.connection;
  }
}

const dbConnection = new DBConnection();

export default dbConnection;
