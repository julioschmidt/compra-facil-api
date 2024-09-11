import { Elysia } from "elysia";
import { prisma } from "../prisma";

interface ProductBody {
  name: string;
  price: number;
  supermarketId: number;
  tagId?: number;
}

export const productRoutes = (app: Elysia) => {
  app
    .get("/products", async () => {
      return await prisma.product.findMany();
    })
    .get("/products/:id", async ({ params }) => {
      const id = parseInt(params.id);
      return await prisma.product.findUnique({
        where: { id },
      });
    })
    .post("/products", async ({ body }) => {
      const { name, price, supermarketId, tagId } = body as ProductBody;
      return await prisma.product.create({
        data: { name, price, supermarketId, tagId },
      });
    })
    .put("/products/:id", async ({ params, body }) => {
      const id = parseInt(params.id);
      const { name, price, supermarketId, tagId } = body as ProductBody;
      return await prisma.product.update({
        where: { id },
        data: { name, price, supermarketId, tagId },
      });
    })
    .delete("/products/:id", async ({ params }) => {
      const id = parseInt(params.id);
      return await prisma.product.delete({
        where: { id },
      });
    });
};
