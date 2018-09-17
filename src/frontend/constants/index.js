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

export var getUserLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(loc => {
      resolve({ lat: loc.coords.latitude, lng: loc.coords.longitude });
    }, reject);
  });
};

export var sleep = t => new Promise(r => setTimeout(r, t));

export var copyText = text => {
  var el = document.createElement("input");
  el.value = `${text} ${location.href}`;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};
