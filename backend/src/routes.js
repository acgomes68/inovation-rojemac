import { Router } from 'express';

import CustomerController from './controllers/CustomerController';

const routes = new Router();

/*----------------------------------------------------------------------*/
// Public access routes

// Customers
routes.get('/customers', CustomerController.index);
routes.get('/customers/:id', CustomerController.show);
routes.post('/customers', CustomerController.store);
routes.put('/customers/:id', CustomerController.update);
routes.delete('/customers/:id', CustomerController.destroy);

export default routes;
