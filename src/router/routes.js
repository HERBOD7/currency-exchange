import convertRoutes from '../modules/convert/routes';
import historyRoutes from '../modules/history/routes';

const routes = [...convertRoutes, ...historyRoutes];

export default routes;
