import { Elysia } from "elysia";
import { prisma } from "../prisma";

interface SupermarketBody {
  name: string;
  location: string;
}

export const supermarketRoutes = (app: Elysia) => {
  app
    .get("/supermarkets", async () => {
      return await prisma.supermarket.findMany();
    })
    .get("/supermarkets/:id", async ({ params }) => {
      const id = parseInt(params.id);
      return await prisma.supermarket.findUnique({
        where: { id },
      });
    })
    .post("/supermarkets", async ({ body }) => {
      const { name, location } = body as SupermarketBody;
      return await prisma.supermarket.create({
        data: { name, location },
      });
    })
    .put("/supermarkets/:id", async ({ params, body }) => {
      const id = parseInt(params.id);
      const { name, location } = body as SupermarketBody;
      return await prisma.supermarket.update({
        where: { id },
        data: { name, location },
      });
    })
    .delete("/supermarkets/:id", async ({ params }) => {
      const id = parseInt(params.id);
      return await prisma.supermarket.delete({
        where: { id },
      });
    });
};
