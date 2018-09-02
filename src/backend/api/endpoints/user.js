import Express from "express";
import UserService from "../../services/user";

let router = new Express.Router();

router.get("/", (req, res) => {
  res.json({ msg: "Not yet complete." });
});

router.post("/", async (req, res) => {
  res.json(await UserService.generateUserWithRandomName());
});

router.patch("/", (req, res) => {
  res.json({ msg: "Not yet complete." });
});

router.delete("/", (req, res) => {
  res.json({ msg: "Not yet complete." });
});

export default router;
