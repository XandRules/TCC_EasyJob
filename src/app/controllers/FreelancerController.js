import * as Yup from 'yup';

import Freelancer from '../models/freelancer';
import Address from '../models/Address';

class FreelancerController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      cpf: Yup.string().required(),
      phone: Yup.string().required(),
      gender: Yup.string().required(),
      bio: Yup.string(),
      birth: Yup.string().required(),
      active: Yup.boolean().default(false),
      terms_of_use: Yup.boolean(),
      id_hash: Yup.string().required(),
      password: Yup.string().required().min(6),
      speciality_id: Yup.number().required(),
      address_id : Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.json('Validation fail');
    }

    const freelancerExists = await Freelancer.findOne({
      where: {
        email: req.body.email
      },
    });

    if (freelancerExists) {
      return res.json({
        error: 'Freelancer already exists.'
      });
    }

    let newFreelancer = null;

    try {
      console.log(req.body);
      newFreelancer = await Freelancer.create(req.body);
    } catch (error) {
      return res.json({
        error: error.name
      });
    }

    const {
      id,
      name,
      email,
      active,
      cpf,
      phone,
      id_hash,
    } = newFreelancer;

    return res.json({
      id,
      name,
      email,
      active,
      cpf,
      phone,
      id_hash,
    });
  }

  async index(req, res) {
    const freelancer = await Freelancer.findAll({
      where: {
        active: true
      },
      atributes: [
        'id',
        'name',
        'cpf',
        'email',
        'phone',
        'avatar_id',
        'gender',
        'birth',
        'id_hash',
      ],
    });

    return res.json(freelancer);
  }

  async indexById(req, res) {

    let id = req.body;

    const freelancer = await Freelancer.findAll({
      where: {
        id: req.params.id
      },
      atributes: [
        'id',
        'name',
        'cpf',
        'email',
        'phone',
        'avatar_id',
        'gender',
        'birth',
        'id_hash',
      ],
    });

    return res.json(freelancer);
  }

  async indexByEmail(req, res) {

    const freelancer = await Freelancer.findAll({
      where: {
        email: req.body.email
      }
    });

    const {name, email} = freelancer[0];

    return res.json({
      name,
      email
    });
  }

  async update(req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string(),
        phone: Yup.string(),
        gender: Yup.string(),
        birth: Yup.string(),
        bio: Yup.string(),
        active: Yup.boolean(),
        oldPassword: Yup.string().min(6),
        avatar_id: Yup.number(),
        password: Yup.string()
          .min(6)
          .when('oldPassword', (oldPassword, field) =>
            oldPassword ? field.required() : field
          ),
        confirmPassword: Yup.string().when('password', (password, field) =>
          password ? field.required().oneOf([Yup.ref('password')]) : field
        ),
      });

      await schema.validate(req.body, {
        abortEarly: false,
      });
      
      const {
        oldPassword
      } = req.body;

      const freelancer = await Freelancer.findByPk(req.params.id);

      if (!freelancer) {
        return res.status(404).json({
          error: 'User not Found'
        });
      }

      if (oldPassword && !(await freelancer.checkPassword(oldPassword))) {
        return res.status(401).json({
          error: 'Password does not match'
        });
      }

      const {
        id,
        name,
        email,
        active,
        cpf,
        phone
      } = await freelancer.update(
        req.body
      );

      return res.json({
        id,
        name,
        email,
        active,
        cpf,
        phone,
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

  async delete(req, res) {

    try {
      const freelancer = await Freelancer.findByPk(req.params.id);

      if (!freelancer) {
        return res.json({
          error: 'freelancer not Found'
        });
      }

      const address = await Address.findByPk(req.params.id);

      if (!address) {
        console.log('address not Found');

      } else {
        response = await Address.destroy({
          where: {
            freelancer_id: req.params.id
          }
        });
      }

      const response = await Freelancer.destroy({
        where: {
          id: req.params.id
        }
      });

      return res.json(response);

    } catch (error) {
      return res.json({
        error: error
      });
    }

  }
}

export default new FreelancerController();
