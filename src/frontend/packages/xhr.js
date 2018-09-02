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

export default ({ url, method, props }) => {
  return new Promise(resolve => {
    let req = new XMLHttpRequest();
    req.open(method.toUpperCase(), url);
    props && req.setRequestHeader("Content-Type", "application/json");
    req.onload = () => resolve(JSON.parse(req.responseText));
    req.send(props);
  });
};
