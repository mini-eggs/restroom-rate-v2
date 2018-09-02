import Clusterer from "./cluster";
import app from "./server";
import database from "./database";

let port = process.env.PORT || 8080;
database.sync();

Clusterer(() => app.listen(port));
