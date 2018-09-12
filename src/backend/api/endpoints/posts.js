import Express from "express";
import RateService from "../../services/rate";

var router = new Express.Router();

router.get("/single/:id", async (req, res) => {
  res.json(await RateService.find({ id: req.params.id }));
});

router.get(["/", "/:category", "/:category/:page"], async (req, res) => {
  var category = req.params.category || undefined;
  var page = req.params.page || 0;
  var limit = 15;
  res.json(await RateService.query({ category, page, limit }));
});

router.post("/", async (req, res) => {
  res.json(await RateService.create(req.body));
});

router.post("/search", async (req, res) => {
  res.json(await RateService.search(req.body));
});

router.patch("/", (req, res) => {
  res.json({ msg: "Not yet complete." });
});

router.delete("/", (req, res) => {
  res.json({ msg: "Not yet complete." });
});

export default router;
