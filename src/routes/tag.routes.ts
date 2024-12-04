import { Elysia } from "elysia";
import { prisma } from "../prisma";

interface TagBody {
  name: string;
}

export const tagRoutes = (app: Elysia) => {
  app
    .get("/tags", async () => {
      return await prisma.tag.findMany();
    })
    .get("/tags/:id", async ({ params }) => {
      const id = parseInt(params.id);
      return await prisma.tag.findUnique({
        where: { id },
      });
    })
    .get("/tags/:id/products", async ({ params }) => {
      console.log(params);
      const id = parseInt(params.id);
      let product =  await prisma.product.findFirst({
        where: { tagId: id },
        select: {
          id: true,
          name: true,
          price: true,
        }
      })

      console.log(product);

      if (!product) {
        return null;
      }

      return product;
    })
    .post("/tags", async ({ body }) => {
      const { name } = body as TagBody;
      return await prisma.tag.create({
        data: { name },
      });
    })
    .put("/tags/:id", async ({ params, body }) => {
      const id = parseInt(params.id);
      const { name } = body as TagBody;
      return await prisma.tag.update({
        where: { id },
        data: { name },
      });
    })
    .delete("/tags/:id", async ({ params }) => {
      const id = parseInt(params.id);
      return await prisma.tag.delete({
        where: { id },
      });
    });
};
