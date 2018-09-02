// import greenlet from "greenlet"; // may revisit

// let xhr = greenlet(({ url, method, props }) => {
//   let base = process.env.BASE_URL;
//   let port = process.env.PORT;
//   let req = new XMLHttpRequest();
//   req.open(method.toUpperCase(), `${base}:${port}${url}`, false); // sync -- greenlet has issues w/ parcel.
//   props && req.setRequestHeader("Content-Type", "application/json");
//   req.send(props);
//   return JSON.parse(req.responseText);
// });

// export default async ({ url, method, props }) => {
//   let data = { url, method };
//   if (props) data.props = JSON.stringify(props);
//   return await xhr(data);
// };

let xhr = ({ url, method, props, headers }) => {
  return new Promise(resolve => {
    let req = new XMLHttpRequest();
    req.open(method.toUpperCase(), url);
    props && req.setRequestHeader("Content-Type", "application/json");
    req.onload = () => resolve(JSON.parse(req.responseText));

    if (headers) {
      for (let key in headers) {
        req.setRequestHeader(key, headers[key]);
      }
    }

    req.send(JSON.stringify(props));
  });
};

export let upload = async image => {
  image = image.split("base64,");
  image = image[image.length - 1];

  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Client-ID " + process.env.IMGUR_KEY
  };

  return await xhr({ url: "https://api.imgur.com/3/upload", method: "POST", props: { image }, headers });
};

export default xhr;
