import Sequelize from "sequelize";
import sequelize from "../";

var action = sequelize.define("action", {
  type: Sequelize.STRING
});

export default action;
