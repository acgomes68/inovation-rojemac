require('dotenv').config({
    path: process.env.NODE_ENV === 'testing' ? '.env.testing' : '.env',
});

const { API_URL, API_PORT } = process.env;

export default {
    API_URL,
    API_PORT,
};
