import Joi from "joi";
import { Op } from "sequelize";
import RateModel from "../database/models/rate";
import UserService from "./user";

class RateService {
  static get rules() {
    var name = Joi.string()
      .min(5)
      .max(50)
      .required();
    var desc = Joi.string()
      .min(25)
      .max(5000)
      .required();
    var rating = Joi.number()
      .integer()
      .min(1)
      .max(5)
      .required();
    var lat = Joi.number().required();
    var lng = Joi.number().required();
    var image = Joi.string().required();
    var token = Joi.string().required();
    return Joi.object().keys({ name, desc, rating, image, token, lat, lng });
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
    await RateService.validate(props);
    var user = await UserService.getUserFromToken(props.token);
    return await RateModel.create({ ...props, user });
    // This is how you would query for the user and all their rates.
    // var user = await UserService.getUserFromToken(props.token);
    // return await UserModel.findOne({ where: { id: user.id }, include: [{ model: RateModel, as: "rate" }] });
  }

  static format({ name, image, rating, id, desc, lat, lng }) {
    var small = image
      .replace(".png", "t.png")
      .replace(".jpg", "t.jpg")
      .replace(".jpeg", "t.jpeg");
    var medium = image
      .replace(".png", "m.png")
      .replace(".jpg", "m.jpg")
      .replace(".jpeg", "m.jpeg");
    var large = image
      .replace(".png", "l.png")
      .replace(".jpg", "l.jpg")
      .replace(".jpeg", "l.jpeg");
    var huge = image
      .replace(".png", "h.png")
      .replace(".jpg", "h.jpg")
      .replace(".jpeg", "h.jpeg");
    image = { small, medium, large, huge, original: image };
    return { name, desc, image, rating, id, lat, lng };
  }

  static async query({ limit, page }) {
    var offset = limit * page;
    var posts = await RateModel.findAll({ limit, offset, order: [["id", "DESC"]] });
    return posts.map(RateService.format);
  }

  static async find({ id }) {
    var post = await RateModel.find({ where: { id } });
    return RateService.format(post);
  }

  static async search({ name }) {
    if (!name) return [];
    var where = { [Op.or]: [{ name: { [Op.like]: `%${name}%` } }] };
    var posts = await RateModel.findAll({ limit: 10, order: [["id", "DESC"]], where });
    return posts.map(RateService.format);
  }
}

export default RateService;
