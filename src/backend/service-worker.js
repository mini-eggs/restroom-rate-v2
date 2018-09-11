import Path from "path";
import FS from "fs";

var createSW = () => {
  var file = FS.readFileSync(Path.join(__dirname, "static/sw.template.js"), "utf-8");
  var dir = FS.readdirSync(Path.join(process.cwd(), "dist"));
  file = file.split("%FILES%").join(JSON.stringify(dir));
  FS.writeFileSync(Path.join(__dirname, "static/sw.js"), file, "utf-8");
};

export default createSW;
