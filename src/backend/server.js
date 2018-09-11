import Express from "express";
import Comrpession from "compression";
import CORS from "cors";
import Path from "path";
import Parser from "body-parser";
import Helmet from "helmet";
import API from "./api";

var loc = process.cwd();
var app = new Express();

app.use(CORS());
app.use(Helmet());
app.use(Comrpession());
app.use(Parser.json({ limit: "5mb" }));
app.use(API);
app.use("/", Express.static(Path.join(__dirname, "static")));
app.use(Express.static(Path.join(loc, "dist")));
app.use("*", Express.static(Path.join(__dirname, "static")));

export default app;
