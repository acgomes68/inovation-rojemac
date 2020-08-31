import Sequelize from 'sequelize';

import Customer from '../app/models/Customer';

import databaseConfig from '../config/database';

const models = [Customer];

class Database {
    constructor() {
        this.init();
    }

    init() {
        const postgresConfig = databaseConfig.postgres;
        this.connection = new Sequelize(postgresConfig);
        models
            .map(model => model.init(this.connection))
            .map(
                model =>
                    model.associate && model.associate(this.connection.models)
            );
    }
}

export default new Database();
