import Chance from "chance";
import user from "../database/models/user";

class UserService {
  static get chance() {
    return new Chance();
  }

  static async generateUserWithRandomName() {
    var username = this.chance.name({ prefix: true, nationality: "en" });
    return await user.create({ username });
  }
}

export default UserService;
