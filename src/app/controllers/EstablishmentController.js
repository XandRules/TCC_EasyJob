import * as Yup from 'yup';

import Establishment from '../models/Establishment';

class EstablishmentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      company_name: Yup.string().required(),
      social_reason: Yup.string().required(),
      email: Yup.string().email().required(),
      cnpj: Yup.string().required(),
      bio: Yup.string(),
      phone: Yup.string().required(),
      active: Yup.boolean().default(false),
      terms_of_use: Yup.boolean(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json('Validation fail');
    }

    const establishmentExists = await Establishment.findOne({
      where: {
        email: req.body.email
      },
    });

    if (establishmentExists) {
      return res.status(400).json({
        error: 'Establishment already exists.'
      });
    }

    let newEstablishment = null;

    try {
      newEstablishment = await Establishment.create(req.body);
    } catch (error) {
      return res.status(401).json({
        error: error.name
      });
    }

    const {
      id,
      company_name,
      social_reason,
      email,
      active,
      cnpj,
      phone
    } = newEstablishment;

    return res.json({
      id,
      company_name,
      social_reason,
      email,
      active,
      cnpj,
      phone,
    });
  }

  async index(req, res) {
    const establishment = await Establishment.findAll({
      where: {
        active: true
      },
      atributes: ['id', 'company_name', 'social_reason','cnpj', 'email', 'phone', 'avatar_id'],
    });

    return res.json(establishment);
  }

  async indexById(req, res) {

    let id = req.body;

    const establishment = await Establishment.findAll({
      where: {
        id: req.params.id
      },
      atributes: ['id', 'company_name','social_reason', 'cnpj', 'email', 'phone', 'avatar_id'],
    });

    return res.json(establishment);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      company_name: Yup.string(),
      social_reason: Yup.string(),   
      phone: Yup.string(),
      bio: Yup.string(),
      active: Yup.boolean(),
      oldPassword: Yup.string().min(6),
      avatar_id: Yup.integer(),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json('Validation fail');
    }

    const {
      email,
      oldPassword
    } = req.body;

    const establishment = await Establishment.findByPk(req.userId);

    if (email !== establishment.email) {
      const establishmentExists = await Establishment.findOne({
        where: {
          email
        },
      });

      if (establishmentExists) {
        return res.status(400).json({
          error: 'Establishment already exists.'
        });
      }
    }

    if (oldPassword && !(await establishment.checkPassword(oldPassword))) {
      return res.status(401).json({
        error: 'Password does not match'
      });
    }

    const {
      id,
      name,
      active,
      cpf,
      phone
    } = await establishment.update(
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
  }
}

export default new EstablishmentController();
