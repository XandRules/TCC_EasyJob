import * as Yup from 'yup';

import Establishment from '../models/Establishment';

class EstablishmentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      company_name: Yup.string().required(),
      email: Yup.string().email().required(),
      cnpj: Yup.string().required(),
      phone: Yup.string().required(),
      active: Yup.boolean().default(false),
      terms_of_use: Yup.boolean(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json('Validation fail');
    }

    const establishmentExists = await Establishment.findOne({
      where: { email: req.body.email },
    });

    if (establishmentExists) {
      return res.status(400).json({ error: 'Establishment already exists.' });
    }

    let newEstablishment = null;

    try {
      newEstablishment = await Establishment.create(req.body);
    } catch (error) {
      return res.status(401).json({ error: error.name });
    }

    const { id, conpany_name, email, active, cnpj, phone } = newEstablishment;

    return res.json({
      id,
      conpany_name,
      email,
      active,
      cnpj,
      phone,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      conpany_name: Yup.string(),
      email: Yup.string(),
      phone: Yup.string(),
      terms_of_use: Yup.boolean(),
      oldPassword: Yup.string().min(6),
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

    const { email, oldPassword } = req.body;

    const establishment = await Establishment.findByPk(req.userId);

    if (email !== establishment.email) {
      const establishmentExists = await Establishment.findOne({
        where: { email },
      });

      if (establishmentExists) {
        return res.status(400).json({ error: 'Establishment already exists.' });
      }
    }

    if (oldPassword && !(await establishment.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name, active, cpf, phone } = await establishment.update(
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
