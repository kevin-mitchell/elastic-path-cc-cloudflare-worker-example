import { Customer, Moltin, Order } from "@moltin/sdk";
import { DIContainer } from '../../inversify.config';
import RouterRequest from "cloudflare-router/dist/RouterRequest";
import RouterResponse from "cloudflare-router/dist/RouterResponse";
import { inject, injectable } from "inversify";
import { TYPES } from "../../di/types";
import Handler from "../handler";
import { WebhookPayload } from "../../domain/epcc/webhook-payload";

export default class CustomerCreatedHandler implements Handler {

    // @inject(TYPES.Moltin) motlin: Moltin;    
    
    async handle(req: RouterRequest<any>, res: RouterResponse<any>): Promise<RouterResponse<any>> {            

        let body = (await req.request.json()) as unknown as WebhookPayload<Customer>;

        let moltin: Moltin = DIContainer.get(TYPES.Moltin);                
        try {
                      
            console.error(body);
            return res.json(body);
        } catch(error) {            
            console.error(JSON.stringify(error));            
            return res.json(error);
        }

    }
    
}