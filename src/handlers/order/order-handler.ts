import { Moltin } from "@moltin/sdk";
import { DIContainer } from '../../../inversify.config';
import RouterRequest from "cloudflare-router/dist/RouterRequest";
import RouterResponse from "cloudflare-router/dist/RouterResponse";
import { inject, injectable } from "inversify";
import { TYPES } from "../../di/types";
import Handler from "../handler";
import ExampleConverter from "../../domain/example-converter";

export default class OrderHandler implements Handler {

    // @inject(TYPES.Moltin) motlin: Moltin;
    // @inject(ExampleConverter) exampleConverter!: ExampleConverter;
    
    handle(req: RouterRequest<any>, res: RouterResponse<any>): RouterResponse<any> {            
        let moltin: Moltin = DIContainer.get(TYPES.Moltin); 
               
        // return res.text(blah.Addresses.endpoint + " - " + blah.config.client_id + " - " + typeof this.motlin);
        // return res.text(blah.Addresses.endpoint + " - " + blah.config.client_id + " - ");
        // return res.text(typeof motlin + "- '_'" + Math.random() + this.exampleConverter.convert('asdf'));
        return res.text(typeof moltin + " - " + "- '_'" + Math.random());
    }

}