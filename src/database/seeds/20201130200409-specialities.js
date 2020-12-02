module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.bulkInsert('specialities', 
      [
        {
          speciality_function: 'Garçon/Garçonete',
        },
        {
          speciality_function: 'Recepcionista',
        },
        {
        speciality_function: 'Motoboy',
        },
        {
        speciality_function: 'Segurança',
        },
        {
        speciality_function: 'Cozinheiro',
        },
        {
        speciality_function: 'Banda/Músico',
        }

      ], {}),
  
    down: (queryInterface) => queryInterface.bulkDelete('specialities', null, {}),
  };