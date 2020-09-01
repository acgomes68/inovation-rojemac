const Customer = require('../models/Customer');

// https://www.receitaws.com.br/v1/cnpj/09181426000163

module.exports = {
    async index(req, res) {
        const { name, cnpj } = req.query;
        let customer;

        if (name) {
            customer = await Customer.find({ name });
        } else if (cnpj) {
            customer = await Customer.find({ cnpj });
        } else {
            customer = await Customer.find();
        }
        return res.json(customer);
    },
    async show(req, res) {
        const { id } = req.params;
        const customer = await Customer.findById(id);

        if (customer) {
            return res.json(customer);
        }

        return res.status(400).json({ error: 'Customer does not exist' });
    },
    async store(req, res) {
        const { filename } = req.file;
        const { company, price, techs } = req.body;
        const { user_id } = req.headers;
        const has_user = await Customer.findById(user_id);
        let customer;
        let msg;
        let status;

        if (!has_user) {
            status = 400;
            msg = 'Customer does not exist';
        } else {
            customer = await Customer.create({
                user: user_id,
                thumbnail: filename,
                company,
                techs: techs.split(',').map(tech => tech.trim()),
                price,
            });
            await customer.populate('user').execPopulate();
            if (customer) {
                status = 200;
                msg = 'Customer added successfully';
                return res.json(customer);
            }

            status = 400;
            msg = 'Errors founded during adding customer';
        }
        return res.status(status).json({ error: msg });
    },
    async update(req, res) {
        const { id } = req.params;
        const { filename } = req.file;
        const { company, price, techs } = req.body;
        const { user_id } = req.headers;
        const has_user = await Customer.findById(user_id);
        const has_customer = await Customer.findById(id);
        let customer;
        let msg;
        let status;

        if (!has_customer) {
            status = 400;
            msg = 'Customer does not exist';
        } else if (!has_user) {
            status = 400;
            msg = 'Customer does not exist';
        } else {
            customer = await Customer.findByIdAndUpdate(id, {
                user: user_id,
                thumbnail: filename,
                company,
                techs: techs.split(',').map(tech => tech.trim()),
                price,
            });
            if (customer) {
                status = 200;
                msg = 'Customer updated successfully';
                return res.json(customer);
            }

            status = 400;
            msg = 'Errors founded during updating customer';
        }
        return res.status(status).json({ error: msg });
    },
    async destroy(req, res) {
        const { id } = req.params;
        const has_customer = await Customer.findById(id);
        let customer;
        let msg;
        let status;

        if (has_customer) {
            customer = await Customer.findByIdAndDelete(id);
            if (customer) {
                status = 200;
                msg = 'Customer deleted successfully';
                return res.json(customer);
            }

            status = 400;
            msg = 'Errors founded during deleting customer';
        } else {
            status = 400;
            msg = 'Customer does not exist';
        }
        return res.status(status).json({ error: msg });
    },
};
