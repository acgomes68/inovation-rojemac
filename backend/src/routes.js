import { Router } from 'express';

import CustomerController from './app/controllers/CustomerController';

const routes = new Router();

/*----------------------------------------------------------------------*/
// Public access routes

// Customers
routes.get('/customers', CustomerController.index);
routes.get('/customers/:id', CustomerController.show);
routes.post('/customers', CustomerController.store);
routes.put('/customers', CustomerController.update);
routes.delete('/customers/:id', CustomerController.delete);

export default routes;
