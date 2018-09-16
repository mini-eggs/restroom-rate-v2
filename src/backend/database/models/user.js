import Sequelize from "sequelize";
import sequelize from "../";
import rate from "./rate";

var user = sequelize.define("user", {
  username: Sequelize.STRING
});

user.hasMany(rate, { as: "rate" });
rate.belongsTo(user, { as: "user" });

export default user;
