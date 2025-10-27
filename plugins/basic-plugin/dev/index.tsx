import { createDevApp } from '@backstage/dev-utils';
import { basicPluginPlugin, BasicPluginPage } from '../src/plugin';

createDevApp()
  .registerPlugin(basicPluginPlugin)
  .addPage({
    element: <BasicPluginPage />,
    title: 'Root Page',
    path: '/basic-plugin',
  })
  .render();
