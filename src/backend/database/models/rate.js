import Sequelize from "sequelize";
import sequelize from "../";
import media from "./media";

var rate = sequelize.define("rate", {
  name: Sequelize.STRING,
  desc: Sequelize.STRING,
  image: Sequelize.STRING,
  rating: Sequelize.INTEGER,
  lat: Sequelize.INTEGER,
  lng: Sequelize.INTEGER
});

rate.hasMany(media);
media.belongsTo(rate);

export default rate;
