import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore } from 'date-fns';
import Job from '../models/Job';
import Freelancer from '../models/freelancer';
import Establishment from '../models/Establishment';
import Announcement from '../models/Announcements';

class JobController {
  async index(req, res) {
    const jobs = await Job.findAll({
      where: { freelancer_id: req.userId, canceled_at: null },
    });

    return res.json(jobs);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      freelancer_evaluation: Yup.number(),
      freelancer_comment: Yup.string(),
      establishment_evaluation: Yup.number(),
      establishment_comment: Yup.string(),
      date: Yup.date().required(),
      freelancer_id: Yup.number().required(),
      establishment_id: Yup.number().required(),
      announcement_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json('Validation fail');
    }

    const { date, freelancer_id, establishment_id, announcement_id } = req.body;

    const isFreelancer = await Freelancer.findOne({
      where: { id: freelancer_id, active: true, email: req.userEmail },
    });

    if (!isFreelancer) {
      return res.status(401).json('Freelancer not Found');
    }

    const isEstablishment = await Establishment.findOne({
      where: { id: establishment_id, active: true },
    });

    if (!isEstablishment) {
      return res.status(401).json('Establishment not Found');
    }

    const isAnnoucement = await Announcement.findOne({
      where: { id: announcement_id },
    });

    if (!isAnnoucement) {
      return res.status(401).json('Announcement not Found');
    }

    const hourStart = startOfHour(parseISO(date));

    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    const job = await Job.create(req.body);

    return res.json({ job });
  }
}

export default new JobController();
