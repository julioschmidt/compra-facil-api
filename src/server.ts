import { Elysia } from "elysia";
import { supermarketRoutes } from "./routes/supermarket.routes";
import { shoppingCartRoutes } from "./routes/shoppingCart.routes";
import { shoppingCartProductRoutes } from "./routes/shoppingCartProduct.routes";
import { userRoutes } from "./routes/user.routes";
import { productRoutes } from "./routes/procut.routes";
import { tagRoutes } from "./routes/tag.routes";

const app = new Elysia().get("/", async () => {
  return "Hello, Elysia!";
});

productRoutes(app);
tagRoutes(app);
userRoutes(app);
shoppingCartRoutes(app);
shoppingCartProductRoutes(app);

app.listen(3000);
