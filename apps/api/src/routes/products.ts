import { Hono } from "hono";
import { prisma } from "../lib/prisma";

const products = new Hono();

products.get("/", async (c) => {
  const product = await prisma.product.findMany({
    include: {
      category: true,
    },
  });
  return c.json(product);
});

export default products;
