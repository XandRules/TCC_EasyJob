process.env.NODE_ENV = "test";

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
    });
  });

});

describe("Freelancer", async function() {
    let Freelancer = require("../src/app/models/test/").freelancer;
  
    beforeEach(function() {
        Freelancer.sync();
    });
  
    afterEach(function() {
        Freelancer.destroy({ truncate : true, cascade: false });
    });

    let data = {
        "name": "Alexandre Ribeiro",
        "email":"alexandre@email.com",
        "gender": "Masculino",
        "birth": "07/01/1991",
        "cpf": "12345788911",
        "phone": "99995648999",
        "password_hash": "123456",
        "active":	true
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
        "password": "123456",
        "active":	true
    }
  
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
      });
    });
  
  });