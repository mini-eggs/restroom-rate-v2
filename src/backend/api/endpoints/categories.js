import Express from "express";

var router = new Express.Router();

router.get("/", (req, res) => {
  res.json([
    { href: "/discover/restaurants", title: "Restaurants" },
    { href: "/discover/colleges", title: "Colleges" },
    { href: "/discover/starbucks", title: "Starbucks" }
  ]);
});

router.post("/", (req, res) => {
  res.json({ msg: "Not yet complete." });
});

router.patch("/", (req, res) => {
  res.json({ msg: "Not yet complete." });
});

router.delete("/", (req, res) => {
  res.json({ msg: "Not yet complete." });
});

export default router;
