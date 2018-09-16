import { createServer } from "spdy";
import app from "./server";
import Clusterer from "./cluster";
import database from "./database";

database.sync();
Clusterer(() => app.listen(process.env.PORT || 8080));
