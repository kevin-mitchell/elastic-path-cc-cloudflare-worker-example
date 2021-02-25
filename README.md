TypeScript Elastic Path Commerce Clouder Cloudflare Worker Example

**This is an _example_ - perhaps a starting place for something better**

This example projet puts many of the basic pieces in place required to standup a Cloudflare Worker and integrate with Elastic Path Motlin to accept webhook events and make authenticated requests to Motlin using the Motlin JavaScript SDK. This is all done using TypeScript.
## Basic features in example:

* Use InversifyJS to provide dependency injection / IoC container
    * This isn't FULLY configured, sadly annotations do not work at this point :/
* Working instance of Moltin SDK can be resolved from IoC container
    * This will come pre-configured with all secrets required to function
    * Secrets (API keys) are securely stored using `wrangler` and Cloudflare Workers secret feature
* Basic routing system in place which is setup for listening for required events
    * `/order-created` for order creation webhook event
    * `/order-payment` for order payment webhook event(s)
    * Uses Workers secret storage to store shared secret and validate request authenticity (this should be made more robust most likely)

**Warning: Sometimes functions as a service / serverless type things like Workers / AWS Lambda / Azure Functions aren't quite as ephemeral as you might expect - some thought should be given to make sure data doesn't leak between requests (e.g. through use of singleton in IoC container)**

## Major TODOs

This is not an exaustive list.

* Consider using different routing system - the current system in place is not really supported but a contribution from a Workers user. That said, it may do the job and is a lot smaller than something like Express
* Tests need to be added - I think this is critical for at the very least the handlers
* Adding a logging service should strongly be considered - Sentry, Loggly, etc - without an external logging service, there is little to no visiblity if something goes very wrong - the webhook response sent to Moltin _might_ cut it, but if there are important integrations that may require debugging it will be much more difficult without log visibility. `wrangler tail` is an option but only shows CURRENT logs and in my limit experience these are cumbersome to deal with. 
* Verification / validation of the logic used to verify Motlin secret token
* Business logic needs to be implemented :) 


## High level approach

This is  a single Worker "function" that will handle all webhook requests from Elastic Path CC. At this point it is not intended be publically available and would ideally 

## Dependencies

1. [Cloudflare `wrangler`](https://github.com/cloudflare/wrangler) should be setup / installed (note the `wrangler.example.toml` file is an example that should work if you add your account id and zone id and set a reasonable name)
2. `npm` (later the better probably, but I think anything 10+ will work?)

## Initial setup

1. As mentioned either add your own `wrangler.toml` file, or copy / move `wrangler.example.toml` and make it your own
2. As of now there are a few secrets that need to be setup in Cloudflare Workers configuration. These are (likely outdated by the time you read this)
    1. `EPCC_CLIENT_ID` for configuration of EPCC SDK
    2. `EPCC_CLIENT_SECRET` for configuration of EPCC SDK
    3. `EPCC_WEBHOOK_SECRET_KEY` the secret used to sign webhooks coming from EPCC
3. `npm install`

## Running locally

_note: currently the secrets mentioned above may need to be overriden or otherwise manually configured when running locally as I believe these are only actually available in the actual Worker environment. An elegant solution is likely possible to make the development experience nicer but for now these may need to be hardcoded._

`wrangler dev` will startup a local instance of the service


## Deployment

Deployment is done using the `wrangler publish` CLI. I have setup a few example environments in the `wrangler.example.toml` file which _can_ be used but *I would strongly recommend having a good understanding of what these different environments entail*. Note though that these are just examples and really would ultimately depend on the client project, etc. I suspect a larger projects might have a more advanced / robust access control setup (e.g. have different accounts for each environment, etc). For now it's as easy as appending `--env=<environment>`, e.g. 

`wrangler publish --env=dev`


