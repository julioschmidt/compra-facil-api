import { Elysia } from "elysia";
import { prisma } from "../prisma";

interface ShoppingCartBody {
  userId: number;
}

export const shoppingCartRoutes = (app: Elysia) => {
  app
    .get("/shopping-carts", async () => {
      return await prisma.shoppingCart.findMany();
    })
    .get("/shopping-carts/:id", async ({ params }) => {
      const id = parseInt(params.id);
      return await prisma.shoppingCart.findUnique({
        where: { id },
      });
    })
    .post("/shopping-carts", async ({ body }) => {
      const { userId } = body as ShoppingCartBody;
      return await prisma.shoppingCart.create({
        data: { userId },
      });
    })
    .put("/shopping-carts/:id", async ({ params, body }) => {
      const id = parseInt(params.id);
      const { userId } = body as ShoppingCartBody;
      return await prisma.shoppingCart.update({
        where: { id },
        data: { userId },
      });
    })
    .delete("/shopping-carts/:id", async ({ params }) => {
      const id = parseInt(params.id);
      return await prisma.shoppingCart.delete({
        where: { id },
      });
    });
};
