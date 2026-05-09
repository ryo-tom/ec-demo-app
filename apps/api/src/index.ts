import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { prisma } from "./lib/prisma";

const schema = z.object({
  name: z.string(),
  description: z.string().optional(),
  price: z.number(),
  stock: z.number(),
  categoryId: z.number(),
});

const app = new Hono();

const routes = app
  .get("/api/products", async (c) => {
    const products = await prisma.product.findMany({
      include: { category: true },
    });
    return c.json(products);
  })
  .get("/api/products/:id", async (c) => {
    const id = Number(c.req.param("id"));
    const product = await prisma.product.findUnique({
      where: { id },
    });
    if (!product) return c.json({ message: "Not found" }, 404);
    return c.json(product);
  })
  .post("/api/products", zValidator("json", schema), async (c) => {
    const body = c.req.valid("json");
    const product = await prisma.product.create({
      data: body,
    });
    return c.json(product, 201);
  });

export type AppType = typeof routes;

export default {
  port: 3001,
  fetch: app.fetch,
};
