import Joi from "joi";
import rate from "../database/models/rate";

class RateService {
  static get rules() {
    let name = Joi.string()
      .min(5)
      .max(50)
      .required();

    let rating = Joi.number()
      .integer()
      .min(1)
      .max(5)
      .required();

    let image = Joi.string().required();

    let user = Joi.number()
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
    return { name, image, rating, id };
  }

  static async query({ limit, page }) {
    let offset = limit * page;
    let posts = await rate.findAll({ limit, offset, order: [["id", "DESC"]] });
    return posts.map(RateService.format);
  }
}

export default RateService;
