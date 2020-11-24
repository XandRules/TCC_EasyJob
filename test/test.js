process.env.NODE_ENV = "test";

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
    });
  });

});

describe("Freelancer", function() {
    let Freelancer = require("../src/app/models/test/").freelancer;
  
    beforeEach(function() {
        Freelancer.sync();
    });
  
    afterEach(function() {
        Freelancer.destroy({ truncate: true });
    });

    let data = {
        "name": "Alexandre Ribeiro",
        "email":"alexandre@email.com",
        "gender": "Masculino",
        "birth": "07/01/1991",
        "cpf": "12345788911",
        "phone": "99995648999",
        "password": "123456",
        "active":	true
    }
  
    it("create", function() {
        Freelancer.create(data).then(function(freelancer) {
          console.log(freelancer);
        expect(freelancer.id).to.be(data);
      });
    });
  
  });