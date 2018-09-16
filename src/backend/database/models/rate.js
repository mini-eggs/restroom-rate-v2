import Sequelize from "sequelize";
import sequelize from "../";
import action from "./action";

var rate = sequelize.define("rate", {
  name: Sequelize.STRING,
  desc: Sequelize.STRING,
  image: Sequelize.STRING,
  rating: Sequelize.INTEGER,
  lat: Sequelize.FLOAT,
  lng: Sequelize.FLOAT
});

rate.hasMany(action, { as: "action" });
action.belongsTo(rate, { as: "rate" });

export default rate;
