import { Router } from "cloudflare-router";
const router = new Router();
const apiRouter = new Router();

// Connecting routers
router.use("/api", apiRouter);

// Setting up paths
router.get("/", (req, res) => res.text("Hello, world!"));
apiRouter.get("/", (req, res) => res.text("Welcome to the API!"));
apiRouter.get("/welcome/:name", (req, res) => {    
  if (req !== undefined && req.params !== undefined) {
    return res.text(`Welcome, kevin`);
  }
});

addEventListener("fetch", event => {    
    event.respondWith(
        router.serve(event.request)
            .then(res => res.response) as Promise<Response>
    );
});