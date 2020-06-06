import * as Yup from 'yup';

import Announcements from '../models/Announcements';

class AnnouncementsController {
  async store(req, res) {
    // const schema = Yup.object().shape({
    //   description: Yup.string().required(),
    //   period: Yup.string().required(),
    //   amount: Yup.string().required(),
    //   day_of_week: Yup.string().required(),
    //   freelancer_id: Yup.number().required(),
    //   speciality_id: Yup.number().required(),
    // });

    // if (!(await schema.isValid(req.body))) {
    //   return res.status(400).json('Validation fail');
    // }

    let newAnnouncements = null;
    try {
      newAnnouncements = await Announcements.create(req.body);
    } catch (error) {
      return res.status(401).json({ error });
    }

    const {
      id,
      description,
      amount,
      day_of_week,
      period,
      freelancer_id,
      speciality_id,
    } = newAnnouncements;

    return res.json({
      id,
      description,
      amount,
      day_of_week,
      period,
      freelancer_id,
      speciality_id,
    });
  }

  async index(req, res) {
    const announcements = await Announcements.findAll({
      atributes: [
        'id',
        'description',
        'amount',
        'day_of_week',
        'period',
        'freelancer_id',
        'speciality_id',
      ],
    });

    return res.json(announcements);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string(),
      period: Yup.string(),
      amount: Yup.string(),
      day_of_week: Yup.string(),
      speciality_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json('Validation fail');
    }

    // console.log(req.body);

    const announcements = await Announcements.findByPk(req.params.id);

    // return res.json(announcements);

    if (!announcements) {
      return res.status(400).json({ error: 'Announcements not Found' });
    }

    const {
      id,
      description,
      period,
      amount,
      day_of_week,
      speciality_id,
    } = await announcements.update(req.body);

    return res.json({
      id,
      description,
      period,
      amount,
      day_of_week,
      speciality_id,
    });
  }

  async delete(req, res) {
    const announcements = await Announcements.findByPk(req.params.id);

    // if (!announcements) {
    //   return res.status(400).json({ error: 'Announcements not Found' });
    // }

    // const response = await announcements.delete();

    return res.json(announcements);
  }
}

export default new AnnouncementsController();
