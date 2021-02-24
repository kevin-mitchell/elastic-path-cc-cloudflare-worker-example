# Kevin's TypeScript Elastic Path Commerce Clouder Cloudflare Worker Example

**This is an _example_, perhaps a starting place.**

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
2. `npm install`

## Running locally

_note: currently the secrets mentioned above may need to be overriden or otherwise manually configured when running locally as I believe these are only actually available in the actual Worker environment. An elegant solution is likely possible to make the development experience nicer but for now these may need to be hardcoded._

`wrangler dev` will startup a local instance of the service


## Deployment

Deployment in wrangler is done via. I have setup a few example environments in the `wrangler.example.toml` file. Note though that these are just examples and really would ultimately depend on the client project, etc. I suspect a larger projects might have a more advanced / robust access control setup (e.g. have different accounts for each environment, etc). For now it's as easy as appending `--env=<environment>`, e.g. 

`wrangler publish --env=dev`


