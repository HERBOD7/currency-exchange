import loadable from '@loadable/component';

const convertRoutes = [
  {
    path: '/',
    component: loadable(() => import('./pages/index')),
  },
];

export default convertRoutes;
