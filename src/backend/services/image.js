import Imgur from "imgur";

let email = process.env.IMGUR_EMAIL;
let pass = process.env.IMGUR_PASS;
let key = process.env.IMGUR_KEY;

Imgur.setCredentials(email, pass, key);

class ImageService {
  static async uploadBase64(base64) {
    try {
      let formatted = base64.split("base64,");
      return await Imgur.uploadBase64(formatted[formatted.length - 1]);
    } catch (e) {
      throw "Failed to upload image.";
    }
  }
}

export default ImageService;
