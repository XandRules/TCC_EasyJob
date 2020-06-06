import * as Yup from 'yup';

import Speciality from '../models/Speciality';

class SpecialityController {
  async store(req, res) {
    const schema = Yup.object().shape({
      speciality_function: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json('Validation fail');
    }

    let speciality = null;

    try {
      speciality = await Speciality.create(req.body);
    } catch (error) {
      return res.status(401).json({ error });
    }

    return res.json(speciality);
  }

  async index(req, res) {
    const schema = Yup.object().shape({
      speciality_function: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json('Validation fail');
    }

    const speciality = await Speciality.findAll();

    return res.json(speciality);
  }
}

export default new SpecialityController();
