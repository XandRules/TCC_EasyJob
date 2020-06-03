import * as Yup from 'yup';

import Freelancer from '../models/freelancer';

class FreelancerController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      cpf: Yup.string().required(),
      phone: Yup.string().required(),
      gender: Yup.string().required(),
      latitude: Yup.string(),
      longitude: Yup.string(),
      birth: Yup.string().required(),
      active: Yup.boolean().default(false),
      terms_of_use: Yup.boolean(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json('Validation fail');
    }

    const freelancerExists = await Freelancer.findOne({
      where: { email: req.body.email },
    });

    if (freelancerExists) {
      return res.status(400).json({ error: 'Freelancer already exists.' });
    }

    let newFreelancer = null;

    try {
      newFreelancer = await Freelancer.create(req.body);
    } catch (error) {
      return res.status(401).json({ error: error.name });
    }

    const { id, name, email, active, cpf, phone } = newFreelancer;

    return res.json({
      id,
      name,
      email,
      active,
      cpf,
      phone,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string(),
      phone: Yup.string(),
      gender: Yup.string(),
      latitude: Yup.string(),
      longitude: Yup.string(),
      birth: Yup.string(),
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

    const freelancer = await Freelancer.findByPk(req.userId);

    if (email !== freelancer.email) {
      const freelancerExists = await Freelancer.findOne({
        where: { email },
      });

      if (freelancerExists) {
        return res.status(400).json({ error: 'Freelancer already exists.' });
      }
    }

    if (oldPassword && !(await freelancer.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name, active, cpf, phone } = await freelancer.update(req.body);

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

export default new FreelancerController();
