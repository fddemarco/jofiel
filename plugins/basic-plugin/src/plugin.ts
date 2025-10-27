import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const basicPluginPlugin = createPlugin({
  id: 'basic-plugin',
  routes: {
    root: rootRouteRef,
  },
});

export const BasicPluginPage = basicPluginPlugin.provide(
  createRoutableExtension({
    name: 'BasicPluginPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
