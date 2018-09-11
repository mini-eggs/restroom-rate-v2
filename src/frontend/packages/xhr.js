// import greenvar from "greenlet"; // may revisit

// var xhr = greenlet(({ url, method, props }) => {
//   var base = process.env.BASE_URL;
//   var port = process.env.PORT;
//   var req = new XMLHttpRequest();
//   req.open(method.toUpperCase(), `${base}:${port}${url}`, false); // sync -- greenvar has issues w/ parcel.
//   props && req.setRequestHeader("Content-Type", "application/json");
//   req.send(props);
//   return JSON.parse(req.responseText);
// });

// export default async ({ url, method, props }) => {
//   var data = { url, method };
//   if (props) data.props = JSON.stringify(props);
//   return await xhr(data);
// };

var xhr = ({ url, method, props, headers }) => {
  return new Promise(resolve => {
    var req = new XMLHttpRequest();
    req.open(method.toUpperCase(), url);
    props && req.setRequestHeader("Content-Type", "application/json");
    req.onload = () => resolve(JSON.parse(req.responseText));

    if (headers) {
      for (var key in headers) {
        req.setRequestHeader(key, headers[key]);
      }
    }

    req.send(JSON.stringify(props));
  });
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
