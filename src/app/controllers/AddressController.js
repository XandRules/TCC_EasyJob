import * as Yup from 'yup';

import Address from '../models/Address';

class AddressController {
  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        public_place: Yup.string().required(),
        neighborhood: Yup.string().required(),
        uf: Yup.string().required(),
        number: Yup.string().required(),
        cep: Yup.string().required(),
        city: Yup.string().required(),
      });

      await schema.validate(req.body, {
        abortEarly: false,
      });
      
      let newAddress = null;
      try {
        newAddress = await Address.create(req.body);
      } catch (error) {
        return res.json({
          error
        });
      }
  
      const {
        id,
        city,
        number,
        public_place,
        neighborhood,
        uf,
        cep,
      } = newAddress;
  
      return res.json({
        id,
        city,
        number,
        public_place,
        neighborhood,
        uf,
        cep,
      });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        console.log(error);
        return res.json({
          "error": error
        });
      }
    }


  }

  async freelancerAddress(req, res) {

    const address = await Address.findAll({
      where: {       
          freelancer_id: req.params.id
        },
      atributes: [
        'id',
        'city',
        'cep',
        'uf',
        'public_place',
        'neighborhood',
        'number',
      ],
    });

    return res.json(address);
  }

  async establishAddress(req, res) {

    const address = await Address.findAll({
      where: {       
          establish_id: req.params.id
      },
      atributes: [
        'id',
        'city',
        'cep',
        'uf',
        'public_place',
        'neighborhood',
        'number',
      ],
    });
    //maria ivone ribeiro

    return res.json(address);
  }

  async index(req, res) {

    let id = req.params.id;

    const address = await Address.findAll({
      atributes: [
        'id',
        'city',
        'number',
        'public_place',
        'neighborhood',
        'uf',
        'cep',
      ],
    });

    return res.json(address);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      city: Yup.string(),
      number: Yup.number(),
      public_place: Yup.string(),
      neighborhood: Yup.string(),
      cep: Yup.string(),
      uf: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.json('Validation fail');
    }

    // console.log(req.body);

    const address = await Address.findByPk(req.params.id);

    // return res.json(address);

    if (!address) {
      return res.json({
        error: 'address not Found'
      });
    }

    const {
      id,
      city,
      number,
      public_place,
      neighborhood,
      uf,
      cep,
    } = await address.update(req.body);

    return res.json({
      id,
      city,
      number,
      public_place,
      neighborhood,
      uf,
      cep,
    });
  }

  async delete(req, res) {
    const address = await Address.findByPk(req.params.id);

    if (!address) {
      return res.json({
        error: 'address not Found'
      });
    }

    const response = await address.delete();

    return res.json(response);
  }
}

export default new AddressController();
