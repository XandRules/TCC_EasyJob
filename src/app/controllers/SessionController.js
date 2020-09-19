import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';

import Freelancer from '../models/freelancer';
import Establishment from '../models/Establishment';

class SessionController {
  async storeFreelancer(req, res) {
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
      token: jwt.sign({ id, email }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }

  async storeEstablishment(req, res) {
    const { email, password } = req.body;

    const establishment = await Establishment.findOne({ where: { email } });

    if (!establishment) {
      return res.status(401).json({ error: 'Establishment not found' });
    }

    if (!(await establishment.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name } = establishment;

    return res.json({
      establishment: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id, email }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
