const express = require('express');
const routes = express();
const { signUp } = require('./controlers/User/signUp');
const { getUser } = require('./controlers/User/getUser')
const { auth } = require('./middleware/auth');
const { addClient } = require('./controlers/Customer/addClient');
const { login } = require('./controlers/User/login');
const { editUser } = require('./controlers/User/updateUser');
const { getAllClients } = require('./controlers/Customer/getAllClients');
const { updateClient } = require('./controlers/Customer/updateClient');
const { addCharge } = require('./controlers/Charges/addCharge');
const { getAllCharges } = require('./controlers/Charges/getCharges');
const { getChargesByClient } = require('./controlers/Charges/getChargesByClient');
const { getClientsByChargeStatus } = require('./controlers/Customer/getClientsByChargeStatus');
const { getChargesByStatus } = require('./controlers/Charges/getChargesByStatus');
const { deleteCharge } = require('./controlers/Charges/deleteCharge');
const { chargeDetails } = require('./controlers/Charges/chargeDetails');
const { editCharge } = require('./controlers/Charges/editCharge');
const { patchStatus } = require('./controlers/Customer/patchClient');

routes.post('/user', signUp);
routes.post('/login', login);

routes.use(auth);

routes.get('/user', getUser);
routes.put('/user', editUser);
routes.post('/client', addClient);
routes.put('/client', updateClient);
routes.get('/clients', getAllClients);
routes.get('/clients/:status', getClientsByChargeStatus)
routes.post('/charge', addCharge);
routes.get('/charge', getAllCharges);
routes.get('/charge', getChargesByClient);
routes.get('/charge/:clientId', getChargesByClient);
routes.get('/charges/:status/', getChargesByStatus);
routes.delete('/charges/:id', deleteCharge);
routes.get('/charges/details/:id', chargeDetails);
routes.put('/charges/:id', editCharge);

routes.patch('/client/:id', patchStatus);

module.exports = routes;
