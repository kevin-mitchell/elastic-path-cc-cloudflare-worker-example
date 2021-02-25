export default class WebhookSecretVaidator {
    validate(secret: string | undefined): boolean {
        if (secret !== EPCC_WEBHOOK_SECRET_KEY) {
            throw "Who are you?";
        }
        return true;
    }
}