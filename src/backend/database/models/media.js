import Sequelize from "sequelize";
import sequelize from "../";

var media = sequelize.define("media", {
  url: Sequelize.STRING
});

export default media;
