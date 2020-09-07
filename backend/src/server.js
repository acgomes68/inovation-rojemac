import 'dotenv/config';

import app from './app';

const { API_HOST, API_PORT } = process.env;

app.listen(API_PORT, API_HOST);
