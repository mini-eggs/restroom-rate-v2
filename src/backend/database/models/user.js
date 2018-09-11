import Sequelize from "sequelize";
import sequelize from "../";
import rate from "./rate";

var user = sequelize.define("user", {
  username: Sequelize.STRING
});

user.hasMany(rate);
rate.belongsTo(user);

export default user;
