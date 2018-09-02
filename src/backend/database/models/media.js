import Sequelize from "sequelize";
import sequelize from "../";

let media = sequelize.define("media", {
  url: Sequelize.STRING
});

export default media;
