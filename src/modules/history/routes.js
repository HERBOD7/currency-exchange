import loadable from '@loadable/component';

const historyRoutes = [
  {
    path: '/history',
    component: loadable(() => import('./pages/index')),
  },
];

export default historyRoutes;
