import Cluster from "cluster";
import OS from "os";

var cpus = OS.cpus().length;

export default cb => {
  if (Cluster.isMaster) {
    for (var i = 0; i < cpus; i++) Cluster.fork();
  } else {
    cb();
  }
};
