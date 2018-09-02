import Express from "express";
import Categories from "./endpoints/categories";
import User from "./endpoints/user";
import Posts from "./endpoints/posts";

let router = new Express.Router();

router.use("/categories", Categories);
router.use("/user", User);
router.use("/posts", Posts);

export default router;
