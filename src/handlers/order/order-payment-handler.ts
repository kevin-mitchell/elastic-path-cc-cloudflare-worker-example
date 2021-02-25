import { Moltin } from "@moltin/sdk";
import { DIContainer } from '../../inversify.config';
import RouterRequest from "cloudflare-router/dist/RouterRequest";
import RouterResponse from "cloudflare-router/dist/RouterResponse";
import { TYPES } from "../../di/types";
import Handler from "../handler";
import { OrderEvent, WebhookPayload } from "../../domain/epcc/webhook-payload";
import { create } from 'xmlbuilder2';

export default class OrderPaymentHandler implements Handler {

    async handle(req: RouterRequest<any>, res: RouterResponse<any>): Promise<RouterResponse<any>> {            

        //todo: not actually sure the shape of data we get for the payment event webhooks
        let orderEvent: WebhookPayload<OrderEvent> = (await req.request.json()) as unknown as WebhookPayload<OrderEvent>;
        
        let paymentAndOrderStatusValidForSendingToOMS = true;
        //todo: check / confrim what the order payment status should be for a new / unpaid order
        if (orderEvent.payload.data.payment == "paid") {
            //todo: convert order to OMS formated XML
            //todo: This should be done in a different TESTED converter class(es) - just showing that the project
            //      is setup now with xmlbuilder2.
            const newOrderOMSRequest = {
                api: {                  
                    ApiResponse: {
                        Client: '...',
                        ResponseType: 'NEWORDER',
                        RequestData: {
                            CMS: 'BTS',
                            //...
                            //...
                        }
                    }
                }
            };              
            const newOrderOMSRequestDocument = create(newOrderOMSRequest);
            const newOrderOMSRequestXML = newOrderOMSRequestDocument.end({ prettyPrint: true });
        }
        
        let moltin: Moltin = DIContainer.get(TYPES.Moltin);                
       
        if (paymentAndOrderStatusValidForSendingToOMS) {
            //call to OMS to create order
        } else {
            // todo: what do we do!?
        }

        //MAYBE build a useful data object wtih details from OMS response
        let usefulPaymentDataItMightBeUsefulToSeeInMoltinAdmin = {

        };

        //todo: do we update the item in Moltin here?

        return res.json(usefulPaymentDataItMightBeUsefulToSeeInMoltinAdmin);

    }
    
    
}