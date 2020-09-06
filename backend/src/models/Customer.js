import Sequelize, { Model } from 'sequelize';

class Customer extends Model {
    static init(sequelize) {
        super.init(
            {
                cnpj: Sequelize.STRING(14),
                name: Sequelize.STRING(100),
                address: Sequelize.STRING(100),
                address_number: Sequelize.STRING(20),
                address_complement: Sequelize.STRING(100),
                city: Sequelize.STRING(100),
                state: Sequelize.STRING(2),
                zip: Sequelize.STRING(8),
                phone: Sequelize.STRING(15),
                email: Sequelize.STRING(100),
            },
            {
                sequelize,
            }
        );

        return this;
    }
}

export default Customer;
