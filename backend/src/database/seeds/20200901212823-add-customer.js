'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        /*
        Add altering commands here.
        Return a promise to correctly handle asynchronicity.

        Example:
        return queryInterface.bulkDelete('People', {'name': John Deo'}, {});
        */
        return queryInterface.bulkInsert('customers', [{
            cnpj: '09181426000163',
            name: 'CONVERDIG TECNOLOGIA EM INFORMATICA LTDA',
            address: 'PC MARECHAL DEODORO',
            address_number: 427,
            address_complement: 'Apt 2',
            city: 'SÃO PAULO',
            state: 'SP',
            zip: '01150011',
            phone: '+5511932291835',
            email: 'acgomes@gmail.com',
        }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('customers', null, {});
  }
};
