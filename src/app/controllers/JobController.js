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

    console.log("caiu em job")
    const schema = Yup.object().shape({
      freelancer_evaluation: Yup.number(),
      freelancer_comment: Yup.string(),
      establishment_evaluation: Yup.number(),
      establishment_comment: Yup.string(),
      date: Yup.date().required(),
      freelancer_id: Yup.number(),
      establishment_id: Yup.number().required(),
      announcement_id: Yup.number().required(),
      initial_job_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json('Validation fail');
    }

    const { date, establishment_id, announcement_id , initial_job_id } = req.body;

    // const isFreelancer = await Freelancer.findOne({
    //   where: { id: freelancer_id, active: true, email: req.userEmail },
    // });

    // if (!isFreelancer) {
    //   return res.status(401).json('Freelancer not Found');
    // }

    // const isEstablishment = await Establishment.findOne({
    //   where: { id: establishment_id, active: true },
    // });

    // if (!isEstablishment) {
    //   return res.status(401).json('Establishment not Found');
    // }

    // const isAnnoucement = await Announcement.findOne({
    //   where: { id: announcement_id },
    // });

    // if (!isAnnoucement) {
    //   return res.status(401).json('Announcement not Found');
    // }

    console.log("passou da Validação");

    // const hourStart = startOfHour(parseISO(date));

    // if (isBefore(hourStart, new Date())) {
    //   return res.status(400).json({ error: 'Past dates are not permitted' });
    // }

    const job = await Job.create(req.body);

    return res.json({ job });
  }

  async update(req, res) {
    try {
      const schema = Yup.object().shape({
        freelancer_evaluation: Yup.number(),
        freelancer_comment: Yup.string(),
        establishment_evaluation: Yup.number(),
        establishment_comment: Yup.string(),
      });

      await schema.validate(req.body, {
        abortEarly: false,
      });



      const job = await Job.findByPk(req.params.id);

      console.log(req.body)

      if (!job) {
        return res.status(404).json({
          error: 'User not Found'
        });
      }      

    const jobs = await job.update(
        req.body
      );

    return res.json(jobs);

    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        console.log(error);
        return res.json({
          "error": error
        });
      }
    }

  }
}

export default new JobController();
