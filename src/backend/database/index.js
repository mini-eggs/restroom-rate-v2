import Sequelize from "sequelize";

var DB_HOST = process.env.DB_HOST;
var DB_NAME = process.env.DB_NAME;
var DB_USER = process.env.DB_USER;
var DB_PASS = process.env.DB_PASS;

var conn = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: "mysql",
  logging: false,
  operatorsAliases: false
});

export default conn;
