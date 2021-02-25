import "reflect-metadata";
import { Router } from "cloudflare-router";
import CustomerCreatedHandler from "./handlers/customer/customer-created-handler";
import OrderCreatedHandler from "./handlers/order/order-created-handler";
import OrderPaymentHandler from "./handlers/order/order-payment-handler";
import RouterRequest from "cloudflare-router/dist/RouterRequest";
import WebhookSecretVaidator from '../src/config/webhook-secret-validator';

const router = new Router<any>();
const webhookSecretValidator = new WebhookSecretVaidator();

//todo: I think I'd rather use Express or something better supported for routing

router.post("/order-created", async (request, response) => {  
    //todo: see if this can be done in middleware DRY
    webhookSecretValidator.validate(request.headers['x-moltin-secret-key']);
    
    let handler = new OrderCreatedHandler();
    console.log("received [ORDER CREATED] webhook");
    return await handler.handle(request, response);
});

router.post("/order-payment", async (request, response) => {  
    //todo: see if this can be done in middleware DRY
    webhookSecretValidator.validate(request.headers['x-moltin-secret-key']);
    let handler = new OrderPaymentHandler();
    console.log("received [ORDER PAYMENT] webhook");
    return await handler.handle(request, response);
});


router.post("/customer-created", async (request, response) => {
    //todo: see if this can be done in middleware DRY
    webhookSecretValidator.validate(request.headers['x-moltin-secret-key']);
    let handler = new CustomerCreatedHandler();
    return await handler.handle(request, response);
});


addEventListener("fetch", event => {    
    event.respondWith(
        //todo: fix types (possibly an issue with routing library)
        router.serve(event.request as unknown as RouterRequest<any>)
            .then(res => res.response) as Promise<Response>
    );
});