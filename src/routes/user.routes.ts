import { Elysia } from "elysia";
import { prisma } from "../prisma";

interface UserBody {
  email: string;
  name: string;
}

export const userRoutes = (app: Elysia) => {
  app
    .get("/users", async () => {
      return await prisma.user.findMany();
    })
    .get("/users/:id", async ({ params }) => {
      const id = parseInt(params.id);
      return await prisma.user.findUnique({
        where: { id },
      });
    })
    .post("/users", async ({ body }) => {
      const { email, name } = body as UserBody;
      return await prisma.user.create({
        data: { email, name },
      });
    })
    .put("/users/:id", async ({ params, body }) => {
      const id = parseInt(params.id);
      const { email, name } = body as UserBody;
      return await prisma.user.update({
        where: { id },
        data: { email, name },
      });
    })
    .delete("/users/:id", async ({ params }) => {
      const id = parseInt(params.id);
      return await prisma.user.delete({
        where: { id },
      });
    });
};
