import Sequelize from "sequelize";
import sequelize from "../";
import media from "./media";

var rate = sequelize.define("rate", {
  name: Sequelize.STRING,
  image: Sequelize.STRING,
  rating: Sequelize.INTEGER
});

rate.hasMany(media);
media.belongsTo(rate);

export default rate;
