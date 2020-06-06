import * as Yup from 'yup';
import Job from '../models/Job';
import Freelancer from '../models/freelancer';
import Establishment from '../models/Establishment';

class JobController {
  async store(req, res) {
    const schema = Yup.object().shape({
      freelancer_evaluation: Yup.number(),
      freelancer_comment: Yup.string(),
      establishment_evaluation: Yup.number(),
      establishment_comment: Yup.string(),
      date: Yup.date().required(),
      freelancer_id: Yup.number().required(),
      establishment_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json('Validation fail');
    }

    const { freelancer_id, establishment_id } = req.body;

    const isFreelancer = await Freelancer.findOne({
      where: { id: freelancer_id, active: true },
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

    const job = await Job.create(req.body);

    return res.json({ job });
  }
}

export default new JobController();
