import { TableInterface } from "./TableInterface";

export class UserTable implements TableInterface {
  getCreateQuery() {
    return "CREATE TABLE Persons (PersonID int, LastName varchar(255), FirstName varchar(255), Address varchar(255), City varchar(255));";
  }
}
