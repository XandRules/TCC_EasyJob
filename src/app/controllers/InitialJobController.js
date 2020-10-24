import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore } from 'date-fns';
import Job from '../models/Job';
import InitialJob from '../models/InitialJob';

class InitialJobController {
  async index(req, res) {
    const initialJobs = await InitialJob.findAll();

    return res.json(jobs);
  } 

  async store(req, res) {
    const schema = Yup.object().shape({
      to_user: Yup.string().required(),
      from_user: Yup.string().required(),
      amount: Yup.number().required(),
      comment: Yup.string(),
      date: Yup.date().required(),
      job_id: Yup.number().required(),
      begin_time: Yup.string().required(),
      end_time: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json('Validation fail');
    }

    const { date, freelancer_id, establishment_id, announcement_id } = req.body;

    const hourStart = startOfHour(parseISO(date));

    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    const initialJob = await InitialJob.create(req.body);

    return res.json({ initialJob });
  }
}

export default new InitialJobController();
