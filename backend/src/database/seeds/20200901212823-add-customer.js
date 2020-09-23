module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert(
    'customers',
    [
      {
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
        created_at: new Date(),
      },
    ],
    {},
  ),
  down: (queryInterface) => queryInterface.bulkDelete('customers', null, {})
  ,
};
