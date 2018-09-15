import Clusterer from "./cluster";
import app from "./server";
import database from "./database";

database.sync();
Clusterer(() => app.listen(process.env.PORT || 8080));
