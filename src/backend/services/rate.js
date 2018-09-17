import Joi from "joi";
import { Op, QueryTypes } from "sequelize";
import db from "../database";
import * as queries from "../queries";
import RateModel from "../database/models/rate";
import ActionModel from "../database/models/action";
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

  static validate(props, rules) {
    return new Promise((resolve, reject) => {
      Joi.validate(props, rules, (err, value) => {
        if (err) {
          return reject({ error: RateService.collectErrorsToString(err) });
        }
        resolve();
      });
    });
  }

  static async create(props) {
    await RateService.validate(props, RateService.rules);
    var user = await UserService.getUserFromToken(props.token);
    return await RateModel.create({ ...props, userId: user.id });
    // This is how you would query for the user and all their rates.
    // var user = await UserService.getUserFromToken(props.token);
    // return await UserModel.findOne({ where: { id: user.id }, include: [{ model: RateModel, as: "rate" }] });
  }

  static format({ name, image, rating, id, desc, lat, lng, action = [] }) {
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
    return { name, desc, image, rating, id, lat, lng, likeCount: action.length };
  }

  static async query({ limit, page }) {
    var posts = await RateModel.findAll({
      limit,
      offset: limit * page,
      order: [["id", "DESC"]],
      include: [{ model: ActionModel, as: "action" }]
    });

    return posts.map(RateService.format);
  }

  static async find({ id }) {
    var post = await RateModel.find({ where: { id }, include: [{ model: ActionModel, as: "action" }] });
    return RateService.format(post);
  }

  static async search({ name }) {
    if (!name) return [];
    var where = { [Op.or]: [{ name: { [Op.like]: `%${name}%` } }] };
    var posts = await RateModel.findAll({ limit: 10, order: [["id", "DESC"]], where });
    return posts.map(RateService.format);
  }

  static async likePost({ token, post }) {
    // get full datas
    var [user, rate] = await Promise.all([
      UserService.getUserFromToken(token),
      RateModel.find({ where: { id: post } })
    ]);

    // check if it has already been liked by this user
    var action = await ActionModel.findOne({ where: { userId: user.id, rateId: rate.id } });
    if (action) return action;

    // like it
    return await ActionModel.create({ type: "like", userId: user.id, rateId: rate.id });
  }

  static async getPostByAuthor({ token }) {
    var user = await UserService.getUserFromToken(token);
    var posts = await RateModel.findAll({ where: { userId: user.id } });
    return posts.map(this.format);
  }

  static get nearbyRules() {
    var lat = Joi.number().required();
    var lng = Joi.number().required();
    return Joi.object().keys({ lat, lng });
  }

  static async nearby({ lat, lng }) {
    await this.validate({ lat, lng }, this.nearbyRules); // ensure no sql injection
    var distance = 25;
    var posts = await db.query(queries.nearby({ lat, lng, distance }), { type: QueryTypes.SELECT });
    return posts.map(this.format);
  }
}

export default RateService;
