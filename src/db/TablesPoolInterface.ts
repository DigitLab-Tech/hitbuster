import { TableInterface } from "./TableInterface";

export default interface TablesPoolInterface {
  getTables: () => TableInterface[];
}
