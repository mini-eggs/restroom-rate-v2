import Cluster from "cluster";
import OS from "os";

let cpus = OS.cpus().length;

export default cb => {
  if (Cluster.isMaster) {
    for (let i = 0; i < cpus; i++) Cluster.fork();
  } else {
    cb();
  }
};
