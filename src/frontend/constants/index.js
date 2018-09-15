export var animationDuration = 400;

export var loadGoogleMap = () => {
  return new Promise((resolve, reject) => {
    if (typeof google !== "undefined") {
      resolve();
    } else {
      var script = document.createElement("script");
      script.setAttribute("src", "https://maps.googleapis.com/maps/api/js");
      script.addEventListener("load", resolve);
      script.addEventListener("error", resolve);
      document.body.appendChild(script);
    }
  });
};
