process.env.NODE_ENV = "test";

<<<<<<< HEAD
describe("Speciality",async  function() {
  let Speciality = require("../src/app/models/test/").speciality;

  await beforeEach(function() {
    Speciality.sync();
  });

  await afterEach(function() {
    Speciality.destroy({ truncate : true, cascade: false });
  });

  await it("create", function() {
    Speciality.create({ speciality_function: 'Garçom' }).then(function(speciality) {
       console.log(speciality.speciality_function);
      expect(speciality.speciality_function).to.be('Garçom');
=======
describe("Speciality", function() {
  let Speciality = require("../src/app/models/test/").speciality;

  beforeEach(function() {
    Speciality.sync();
  });

  afterEach(function() {
    Speciality.destroy({ truncate: true });
  });

  it("create", function() {
    Speciality.create({ speciality_function: 'especialidade' }).then(function(speciality) {
        //console.log(speciality);
      expect(speciality.speciality_function).to.be('especialidade');
>>>>>>> add classes de teste
    });
  });

});

<<<<<<< HEAD
describe("Freelancer", async function() {
=======
describe("Freelancer", function() {
>>>>>>> add classes de teste
    let Freelancer = require("../src/app/models/test/").freelancer;
  
    beforeEach(function() {
        Freelancer.sync();
    });
  
    afterEach(function() {
<<<<<<< HEAD
        Freelancer.destroy({ truncate : true, cascade: false });
    });

    let data = {
        "id_hash":"adkasldkALSDa4sd4A4SADa7asdAADas4d5645A4S5D454asd",
=======
        Freelancer.destroy({ truncate: true });
    });

    let data = {
>>>>>>> add classes de teste
        "name": "Alexandre Ribeiro",
        "email":"alexandre@email.com",
        "gender": "Masculino",
        "birth": "07/01/1991",
        "cpf": "12345788911",
        "phone": "99995648999",
<<<<<<< HEAD
        "password_hash": "123456",
        "bio": "",
        "active":	true,
        "terms_of_use": true,
        "speciality_id": 1,
        "address_id": 1
    }
  
    await it("create", function() {
        Freelancer.create(data).then(function(freelancer) {
        expect(freelancer.id).to.be(data);
      });
    });
  
  });

  describe("Establish", async function() {
    let Establishment = require("../src/app/models/test/").establish;
  
    beforeEach(function() {
        Establishment.sync();
    });
  
    afterEach(function() {
        Establishment.destroy({ truncate : true, cascade: false });
    });

    let data = {
        "company_name": "Bar do José",
        "email":"alexandre@email.com",
        "social_reason": "Bar e Pizzaria José da Silva",       
        "cnpj": "12345788911",
        "phone": "99995648999",
=======
>>>>>>> add classes de teste
        "password": "123456",
        "active":	true
    }
  
<<<<<<< HEAD
   await it("create", function() {
       Establishment.create(data).then(function(establishment) {
        expect(establishment.id).to.be(data);
      });
    });
  
  });

  describe("Announcements", async  function() {
    let Announcement = require("../src/app/models/test/").announcement;
  
    beforeEach(function() {
        Announcement.sync();
    });
  
    afterEach(function() {
        Announcement.destroy({ truncate : true, cascade: false });
    });

    let data = {
        "description": "Sou uma bom profissional, tenho bastante experiência",
        "period": "Noite",
        "amount": "R$150,00",
        "day_of_week": "Finais de Semana",
        "freelancer_id": 1,
        "speciality_id": 1
    }
  
    await it("create", function() {
       Announcement.create(data).then(function(announcement) {  
        console.log(announcement);         
        expect(announcement.id).to.be.an(data);
      });
    });
  
  });

  describe("Announcements", async  function() {
    let Announcement = require("../src/app/models/test/").announcement;
  
    beforeEach(function() {
        Announcement.sync();
    });
  
    afterEach(function() {
        Announcement.destroy({ truncate : true, cascade: false });
    });

    let data = {
        "description": "Sou uma bom profissional, tenho bastante experiência",
        "period": "Noite",
        "amount": "R$150,00",
        "day_of_week": "Finais de Semana",
        "freelancer_id": 1,
        "speciality_id": 1
    }
  
    await it("read", function() {
       Announcement.findAll({where : {id: 1}}).then(function(announcement) {  
        console.log(announcement);         
        expect(announcement.id).to.be(data);
=======
    it("create", function() {
        Freelancer.create(data).then(function(freelancer) {
          console.log(freelancer);
        expect(freelancer.id).to.be(data);
>>>>>>> add classes de teste
      });
    });
  
  });