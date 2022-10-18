import loadable from '@loadable/component';

const routes = [
  {
    path: '/',
    component: loadable(() => import('../pages/convert')),
  },
  {
    path: '/history',
    component: loadable(() => import('../pages/history')),
  },
];

export default routes;
