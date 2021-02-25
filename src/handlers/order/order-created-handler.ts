import { Moltin, Order } from "@moltin/sdk";
import { DIContainer } from '../../../inversify.config';
import RouterRequest from "cloudflare-router/dist/RouterRequest";
import RouterResponse from "cloudflare-router/dist/RouterResponse";
import { TYPES } from "../../di/types";
import Handler from "../handler";
import { OrderEvent, WebhookPayload } from "../../domain/epcc/webhook-payload";

export default class OrderCreatedHandler implements Handler {

    async handle(req: RouterRequest<any>, res: RouterResponse<any>): Promise<RouterResponse<any>> {            

        let orderEvent: WebhookPayload<OrderEvent> = (await req.request.json()) as unknown as WebhookPayload<OrderEvent>;
        
        let paymentAndOrderStatusValidForAuthorization = true;
        //todo: check / confrim what the order payment status should be for a new / unpaid order
        if (orderEvent.payload.data.payment == "unpaid") {
            //todo: implement authorization step with payment gateway
            //paymentAndOrderStatusValidForAuthorization = ?
        }
        
        let moltin: Moltin = DIContainer.get(TYPES.Moltin);                
       
        if (paymentAndOrderStatusValidForAuthorization) {
            //call approrpaicate Moltin APIs to mark order as Authorized 
            //todo: no idea which transaction is here, or if we are capturing directly 
            //      or authorizing and then capturing all in one call, etc
            //moltin.Transactions.???            
        } else {
            //else update the order to show order failure
        }

        //todo: what do we do if there is an error from Moltin?

        // build some useful response object 
        let usefulPaymentDataItMightBeUsefulToSeeInMoltinAdmin = {

        };

        return res.json(usefulPaymentDataItMightBeUsefulToSeeInMoltinAdmin);

    }
    
    
}