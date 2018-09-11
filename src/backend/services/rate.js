import Joi from "joi";
import rate from "../database/models/rate";

class RateService {
  static get rules() {
    var name = Joi.string()
      .min(5)
      .max(50)
      .required();

    var rating = Joi.number()
      .integer()
      .min(1)
      .max(5)
      .required();

    var image = Joi.string().required();

    var user = Joi.number()
      .integer()
      .required();

    return Joi.object().keys({ name, rating, image, user });
  }

  static collectErrorsToString(err) {
    return err.details.map(({ message }) => message).join(", ") + ".";
  }

  static validate(props) {
    return new Promise((resolve, reject) => {
      Joi.validate(props, RateService.rules, (err, value) => {
        if (err) {
          return reject({ error: RateService.collectErrorsToString(err) });
        }
        resolve();
      });
    });
  }

  static async create(props) {
    try {
      await RateService.validate(props);
      return await rate.create(props);
    } catch (e) {
      return e;
    }
  }

  static format({ name, image, rating, id }) {
    var thumbnail = image
      .replace(".png", "m.png")
      .replace(".jpg", "m.jpg")
      .replace(".jpeg", "m.jpeg");
    return { name, image, rating, id, thumbnail };
  }

  static async query({ limit, page }) {
    var offset = limit * page;
    var posts = await rate.findAll({ limit, offset, order: [["id", "DESC"]] });
    return posts.map(RateService.format);
  }

  static async find({ id }) {
    var post = await rate.find({ where: { id } });
    return RateService.format(post);
  }
}

export default RateService;
