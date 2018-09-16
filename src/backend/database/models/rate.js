import Sequelize from "sequelize";
import sequelize from "../";

var rate = sequelize.define("rate", {
  name: Sequelize.STRING,
  desc: Sequelize.STRING,
  image: Sequelize.STRING,
  rating: Sequelize.INTEGER,
  lat: Sequelize.FLOAT,
  lng: Sequelize.FLOAT
});

export default rate;
