import Sequelize from 'sequelize';
import * as Yup from 'yup';
import Customer from '../models/Customer';

const Op = Sequelize.Op

// https://www.receitaws.com.br/v1/cnpj/09181426000163

module.exports = {
    async index(req, res) {
        try {
            const { name, cnpj } = req.query;
            let customer;

            if (name) {
                customer = await Customer.findAll({ name });
            } else if (cnpj) {
                customer = await Customer.findAll({ cnpj });
            } else {
                customer = await Customer.findAll();
            }
            return res.json(customer);
        } catch (error) {
            return res.status(502).json({ error });
        }
    },
    async show(req, res) {
        try {
            const { id } = req.params;
            const customer = await Customer.findByPk(id);

            if (!customer) {
                return res.status(404).json({ error: 'Customer not found' });
            }

            return res.json(customer);
        } catch (error) {
            return res.status(502).json({ error });
        }
    },
    async store(req, res) {
        try {
            const {
                cnpj,
                name,
                address,
                addres_number,
                address_complement,
                city,
                state,
                zip,
                phone,
                email,
            } = req.body;
            const schema = Yup.object().shape({
                cnpj: Yup.string().required('CNPJ is required'),
                name: Yup.string().required('Name is required'),
                address_number: Yup.number(
                    'Address Number must be a number'
                ).positive('Address Number must be a positive number'),
                zip: Yup.number().positive('Invalid ZIP'),
                phone: Yup.number().positive('Invalid Phone Number'),
                email: Yup.string().email('Invalid e-Mail'),
            });

            if (!(await schema.isValid(req.body))) {
                return res
                    .status(400)
                    .json({ error: 'Posted data validation failed' });
            }

            const hasCnpj = await Customer.findOne({
                where: { cnpj },
            });
            if (hasCnpj) {
                return res
                    .status(400)
                    .json({ error: 'Customer CNPJ already exists' });
            }

            const hasName = await Customer.findOne({
                where: { name },
            });
            if (hasName) {
                return res
                    .status(400)
                    .json({ error: 'Customer name already exists' });
            }

            const customer = await Customer.create({
                cnpj,
                name,
                address,
                addres_number,
                address_complement,
                city,
                state,
                zip,
                phone,
                email,
            });

            if (customer) {
                return res.status(201).json(customer);
            }

            return res
                .status(400)
                .json({ error: 'Errors encountered while adding the client' });
        } catch (error) {
            return res.status(502).json({ error });
        }
    },
    async update(req, res) {
        try {
            const { id } = req.params;
            const {
                cnpj,
                name,
                address,
                address_number,
                address_complement,
                city,
                state,
                zip,
                phone,
                email,
            } = req.body;
            const schema = Yup.object().shape({
                cnpj: Yup.string().required('CNPJ is required'),
                name: Yup.string().required('Name is required'),
                address_number: Yup.number(
                    'Address Number must be a number'
                ).positive('Address Number must be a positive number'),
                zip: Yup.number().positive('Invalid ZIP'),
                phone: Yup.number().positive('Invalid Phone Number'),
                email: Yup.string().email('Invalid e-Mail'),
            });

            if (!(await schema.isValid(req.body))) {
                return res
                    .status(400)
                    .json({ error: 'Posted data validation failed' });
            }

            const hasCnpj = await Customer.findOne({
                where: { cnpj, id: {[Op.ne]: id} },
            });
            if (hasCnpj) {
                return res
                    .status(400)
                    .json({ error: 'Customer CNPJ already exists' });
            }

            const hasName = await Customer.findOne({
                where: { name, id: {[Op.ne]: id} },
            });
            if (hasName) {
                return res
                    .status(400)
                    .json({ error: 'Customer name already exists' });
            }

            const customer = await Customer.findByIdAndUpdate(id, {
                cnpj,
                name,
                address,
                address_number,
                address_complement,
                city,
                state,
                zip,
                phone,
                email,
            });

            if (customer) {
                return res.status(202).json(customer);
            }
            else {
                return res.status(400).json({ error: 'Errors founded while updating customer' });
            }
            return res.status(status).json({ error: msg });
        } catch (error) {
            return res.status(502).json({ error });
        }
    },
    async destroy(req, res) {
        try {
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
        } catch (error) {
            return res.status(502).json({ error });
        }
    },
};
