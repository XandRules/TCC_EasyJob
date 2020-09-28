import * as Yup from 'yup';

import Announcements from '../models/Announcements';

class AnnouncementsController {
  async store(req, res) {

    try {
      
      const schema = Yup.object().shape({
        description: Yup.string().required(),
        period: Yup.string().required(),
        title: Yup.string().required(),
        amount: Yup.string().required(),
        day_of_week: Yup.string().required(),
        city: Yup.string().required(),
        freelancer_id: Yup.number().required(),
        speciality_id: Yup.number().required(),
      });

      await schema.validate(req.body, {
        abortEarly: false,
      });


      let newAnnouncements = null;
      try {
        newAnnouncements = await Announcements.create(req.body);
      } catch (error) {
        return res.status(401).json({
          error
        });
      }
  
      const {
        id,
        title,
        description,
        amount,
        city,
        day_of_week,
        period,
        freelancer_id,
        speciality_id,
      } = newAnnouncements;
  
      return res.json({
        id,
        title,
        description,
        amount,
        city,
        day_of_week,
        period,
        freelancer_id,
        speciality_id,
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

  async index(req, res) {
    const announcements = await Announcements.findAll({
      atributes: [
        'id',
        'description',
        'title',
        'amount',
        'city',
        'day_of_week',
        'period',
        'freelancer_id',
        'speciality_id',
      ],
    });

    return res.json(announcements);
  }

  async indexById(req, res) {
    const announcements = await Announcements.findAll({
      where: {
        freelancer_id: req.params.id
      },
      atributes: [
        'id',
        'description',
        'title',
        'amount',
        'city',
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
      city: Yup.string(),
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
      return res.status(400).json({
        error: 'Announcements not Found'
      });
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

    try {
      const announcements = await Announcements.findByPk(req.params.id);

      if (!announcements) {
        return res.status(400).json({
          error: 'Announcements not Found'
        });
      }

      const response = await announcements.delete();
  
      return res.json(response);
      
    } catch (error) {
      return res.json({"error": error});
    }

  }
}

export default new AnnouncementsController();
