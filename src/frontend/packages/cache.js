var LS_KEY = "RestroomRateV2";

var cache = new Proxy(JSON.parse(localStorage.getItem(LS_KEY) || "{}"), {
  set: (obj, key, val) => {
    obj[key] = val;
    localStorage.setItem(LS_KEY, JSON.stringify(obj));
    return true;
  }
});

export default cache;
