var xhr = ({ url, method, props, headers }) => {
  var req = new XMLHttpRequest();

  var promise = new Promise((resolve, reject) => {
    req.open(method.toUpperCase(), url);
    props && req.setRequestHeader("Content-Type", "application/json");
    req.onload = () => {
      var res = req.responseText;

      try {
        res = JSON.parse(res);
      } catch (_) {
        reject({ error: "Unexpected error." });
      }

      if (req.status === 200) {
        resolve(res);
      } else {
        reject(res);
      }
    };

    if (headers) {
      for (var key in headers) {
        req.setRequestHeader(key, headers[key]);
      }
    }

    req.send(JSON.stringify(props));
  });

  return Object.assign(promise, { abort: () => req.abort() });
};

export var upload = async image => {
  image = image.split("base64,");
  image = image[image.length - 1];

  var headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Client-ID " + process.env.IMGUR_KEY
  };

  return await xhr({ url: "https://api.imgur.com/3/upload", method: "POST", props: { image }, headers });
};

export default xhr;
