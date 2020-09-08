const tableName = 'customers';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(tableName, {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    cnpj: {
      type: Sequelize.STRING(14),
      allowNull: false,
      unique: true,
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: false,
      unique: true,
    },
    address: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },
    address_number: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    address_complement: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },
    city: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },
    state: {
      type: Sequelize.STRING(2),
      allowNull: true,
    },
    zip: {
      type: Sequelize.STRING(8),
      allowNull: true,
    },
    phone: {
      type: Sequelize.STRING(15),
      allowNull: true,
    },
    email: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    deleted_at: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  }),

  down: (queryInterface) => queryInterface.dropTable(tableName),
};
