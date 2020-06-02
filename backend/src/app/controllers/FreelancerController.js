import Freelancer from '../models/freelancer';

class FreelancerController {
  async store(req, res) {
    const freelancerExists = await Freelancer.findOne({
      where: { email: req.body.email },
    });

    if (freelancerExists) {
      return res.status(400).json({ error: 'Freelancer already exists.' });
    }

    const { id, name, email, active, cpf, phone } = await Freelancer.create(
      req.body
    );

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
