import Express from "express";
import RateService from "../../services/rate";

let router = new Express.Router();

router.get(["/", "/:category", "/:category/:page"], async (req, res) => {
  let category = req.params.category || undefined;
  let page = req.params.page || 0;
  let limit = 15;
  res.json(await RateService.query({ category, page, limit }));
});

router.post("/", async (req, res) => {
  res.json(await RateService.create(req.body));
});

router.patch("/", (req, res) => {
  res.json({ msg: "Not yet complete." });
});

router.delete("/", (req, res) => {
  res.json({ msg: "Not yet complete." });
});

export default router;
