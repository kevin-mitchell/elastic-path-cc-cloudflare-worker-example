import { Moltin, gateway, MemoryStorageFactory } from '@moltin/sdk';
import { Container } from "inversify";
import { TYPES } from "./di/types";

const DIContainer = new Container();
DIContainer.bind<Moltin>(TYPES.Moltin).toConstantValue(gateway({
    client_id: EPCC_CLIENT_ID,
    client_secret: EPCC_CLIENT_SECRET,
    host: 'useast.api.elasticpath.com',   
    storage: new MemoryStorageFactory()
}));


export { DIContainer };