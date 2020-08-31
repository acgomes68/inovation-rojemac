import Sequelize, { Model } from 'sequelize';

class Customer extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
            },
            {
                sequelize,
                paranoid: true,
            }
        );

        return this;
    }
}

export default Customer;
