import * as Yup from 'yup';

import Announcements from '../models/Announcements';
import File from '../models/File';

class AnnouncementsController {
  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
      period: Yup.string().required(),
      amount: Yup.string().required(),
      day_of_week: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json('Validation fail');
    }

    let newAnnouncements = null;

    try {
      newAnnouncements = await Announcements.create(req.body);
    } catch (error) {
      return res.status(401).json({ error: error.name });
    }

    const { id, description, amount, day_of_week, period } = newAnnouncements;

    return res.json({
      id,
      description,
      amount,
      day_of_week,
      period,
    });
  }

  async index(req, res) {
    const establishment = await Announcements.findAll({
      where: { active: true },
      atributes: [
        'id',
        'description',
        'amount',
        'day_of_week',
        'period',
        'photo_id',
      ],
      include: [
        {
          model: File,
          as: 'photo_id',
          atributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(establishment);
  }
}

export default new AnnouncementsController();
