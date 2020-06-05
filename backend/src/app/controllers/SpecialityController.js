import * as Yup from 'yup';

import Speciality from '../models/Speciality';

class SpecialityController {
  async store(req, res) {

    const schema = Yup.object().shape({
      speciality_function: Yup.string().required(),     
    });

    console.log(req.body);

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json('Validation fail');
    }

    let speciality = null;

    try {
      speciality = await Speciality.create(req.body);
    } catch (error) {
      return res.status(401).json({ error: error });
    }

    return res.json(speciality);
  }
}

export default new SpecialityController();
