import { Elysia } from "elysia";
import { prisma } from "../prisma";

interface ShoppingCartProductBody {
  quantity: number;
  productId: number;
  shoppingCartId: number;
}

export const shoppingCartProductRoutes = (app: Elysia) => {
  app
    .get("/shopping-cart-products", async () => {
      return await prisma.shoppingCartProduct.findMany();
    })
    .get("/shopping-cart-products/:id", async ({ params }) => {
      const id = parseInt(params.id);
      return await prisma.shoppingCartProduct.findUnique({
        where: { id },
      });
    })
    .post("/shopping-cart-products", async ({ body }) => {
      const { quantity, productId, shoppingCartId } =
        body as ShoppingCartProductBody;

      const shoppingCartProductExists = await prisma.shoppingCartProduct.findFirst({
        where: { productId, shoppingCartId },
      });

      if (shoppingCartProductExists) { 
        return await prisma.shoppingCartProduct.update({
          where: { id: shoppingCartProductExists.id },
          data: { quantity: shoppingCartProductExists.quantity + quantity },
        });
      } else {
        return await prisma.shoppingCartProduct.create({
          data: { quantity, productId, shoppingCartId },
        });
      }
    })
    .put("/shopping-cart-products/:id", async ({ params, body }) => {
      const id = parseInt(params.id);
      const { quantity, productId, shoppingCartId } =
        body as ShoppingCartProductBody;
      return await prisma.shoppingCartProduct.update({
        where: { id },
        data: { quantity, productId, shoppingCartId },
      });
    })
    .delete("/shopping-cart-products/:id", async ({ params }) => {
      const id = parseInt(params.id);
      return await prisma.shoppingCartProduct.delete({
        where: { id },
      });
    });
};
