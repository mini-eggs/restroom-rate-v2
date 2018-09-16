import Chance from "chance";
import UserModel from "../database/models/user";
import jwt from "jsonwebtoken";

var pass = process.env.JWT_TOKEN || "UnsecureUserTokenPassword";

class UserService {
  static get chance() {
    return new Chance();
  }

  static async generateUserWithRandomName() {
    var username = this.chance.name({ prefix: true, nationality: "en" });
    var user = await UserModel.create({ username });
    return this.generateTokenForUser(user);
  }

  static generateTokenForUser(user) {
    user = user.toJSON();
    var token = jwt.sign(user, pass);
    return { ...user, token };
  }

  static getUserFromToken(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, pass, async (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        try {
          var user = await UserModel.findOne({ where: { id: data.id } });
          if (!user) reject(new Error("User not found."));
          resolve(user);
        } catch (e) {
          reject(e);
        }
      });
    });
  }

  static async updateUsername({ username, token }) {
    var curr = await this.getUserFromToken(token);
    var user = await curr.update({ username });
    return this.generateTokenForUser(user);
  }
}

export default UserService;
