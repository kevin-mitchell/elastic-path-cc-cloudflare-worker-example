import "reflect-metadata";
import { DIContainer } from '../inversify.config';
import { Router } from "cloudflare-router";
import OrderHandler from "./handlers/order/order-handler";

const router = new Router();
const apiRouter = new Router();

// Connecting routers
router.use("/api", apiRouter);

// Setting up paths
router.get("/", new OrderHandler().handle);
// apiRouter.get("/welcome/:name", (req, res) => {    
//   if (req !== undefined && req.params !== undefined) {
//     return res.text(`Welcome, kevin`);
//   }
// });

addEventListener("fetch", event => {    
    event.respondWith(
        router.serve(event.request)
            .then(res => res.response) as Promise<Response>
    );
});