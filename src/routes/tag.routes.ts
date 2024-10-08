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
