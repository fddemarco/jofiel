import {
  createPlugin,
  configApiRef,
  createApiFactory,
  discoveryApiRef,
  createRoutableExtension,
  fetchApiRef,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';
import { UselessFactApiRef, UselessFactsApiClient } from './api';
import { Entity } from '@backstage/catalog-model';
import { USELESSFACT_TYPE } from './components/helper';


export const uselessfactsPlugin = createPlugin({
  id: 'uselessfacts',
  apis: [
    createApiFactory({
        api: UselessFactApiRef,
        deps: {
            discoveryApi: discoveryApiRef,
            configApi: configApiRef,
            fetchApi: fetchApiRef,
        },
        factory: ({discoveryApi, configApi, fetchApi}) => {
            return new UselessFactsApiClient({discoveryApi, configApi, fetchApi});
        },
    }),
  ],
  routes: {
    root: rootRouteRef,
  },
});

export const UselessFactsCard = uselessfactsPlugin.provide(
    createRoutableExtension({
        name: 'UselessFactCard',
        component: () => {
            return import('./components/UselessFactComponent').then(m => m.UselessFactCard)
        },
        mountPoint: rootRouteRef,
    })
)

export const isUselessFactAvailable = (entity: Entity) => {
    return Boolean(entity?.metadata.annotations?.[USELESSFACT_TYPE]);
}
