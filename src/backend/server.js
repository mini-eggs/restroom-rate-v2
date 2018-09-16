import Express from "express";
import "express-async-errors";
import Comrpession from "compression";
import CORS from "cors";
import Path from "path";
import Parser from "body-parser";
import Helmet from "helmet";
import API from "./api";

var loc = process.cwd();
var app = new Express();

var errorHandler = (error, req, res, next) => {
  if (error.toString) error = error.toString();
  res.status(500);
  res.json({ error });
};

app.use(CORS());
app.use(Helmet());
app.use(Comrpession());
app.use(Parser.json({ limit: "5mb" }));
app.use(API);
app.use(errorHandler);
app.use("/", Express.static(Path.join(__dirname, "static"), { cacheControl: true, maxAge: "1d" }));
app.use(Express.static(Path.join(loc, "dist"), { cacheControl: true, maxAge: "1d" }));
app.use("*", Express.static(Path.join(__dirname, "static"), { cacheControl: true, maxAge: "1d" }));

export default app;
