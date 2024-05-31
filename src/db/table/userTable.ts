import { TableInterface } from "./TableInterface";

const userTable: TableInterface = {
  getCreateQuery() {
    return `CREATE TABLE IF NOT EXISTS User(
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      firstname VARCHAR(255) NOT NULL,
      lastname VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP  DEFAULT CURRENT_TIMESTAMP NOT NULL
  );`;
  },
};

export default userTable;
