import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';

import Freelancer from '../models/freelancer';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const freelancer = await Freelancer.findOne({ where: { email } });

    if (!freelancer) {
      return res.status(401).json({ error: 'Freelancer not found' });
    }

    if (!(await freelancer.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name } = freelancer;

    return res.json({
      freelancer: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
