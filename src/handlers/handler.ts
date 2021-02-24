import RouterRequest from "cloudflare-router/dist/RouterRequest";
import RouterResponse from "cloudflare-router/dist/RouterResponse";

export default interface Handler {
    handle(req: RouterRequest<any>, res: RouterResponse<any>): RouterResponse<any>;
}