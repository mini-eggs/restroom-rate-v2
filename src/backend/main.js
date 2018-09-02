import Clusterer from "./cluster";
import app from "./server";
import database from "./database";
import CreateSW from "./service-worker";

let port = process.env.PORT || 8080;
database.sync();

Clusterer(() => app.listen(port));

if (process.env.NODE_ENV === "production") {
  CreateSW();
}
