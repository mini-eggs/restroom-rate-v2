import test from "ava";
import req from "supertest";
import app from "../src/backend/server";

test("Categories get API returns expected results.", async t => {
  let { body } = await req(app).get("/v1/categories");
  t.deepEqual(body, [
    { href: "/discover/restaurants", title: "Restaurants" },
    { href: "/discover/colleges", title: "Colleges" },
    { href: "/discover/starbucks", title: "Starbucks" }
  ]);
});
