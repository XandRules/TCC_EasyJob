import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';

import Freelancer from '../models/freelancer';
import Establishment from '../models/Establishment';

class SessionController {
  async storeFreelancer(req, res) {
    const {
      email,
      password
    } = req.body;

    const freelancer = await Freelancer.findOne({
      where: {
        email
      }
    });

    if (!freelancer) {
      return res.json({
        error: 'Freelancer not found'
      });
    }

    if (!(await freelancer.checkPassword(password))) {
      return res.json({
        error: 'Password does not match'
      });
    }

    const {
      id,
      name,
      id_hash,
    } = freelancer;

    const role = 'freelancer';

    return res.json({
      freelancer: {
        id,
        id_hash,
        name,
        email,
        role,
      },
      token: jwt.sign({
        id,
        email
      }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }

  async storeEstablishment(req, res) {
    const {
      email,
      password
    } = req.body;

    const establishment = await Establishment.findOne({
      where: {
        email
      }
    });

    if (!establishment) {
      return res.json({
        error: 'Establishment not found'
      });
    }

    if (!(await establishment.checkPassword(password))) {
      return res.json({
        error: 'Password does not match'
      });
    }

    const {
      id,
      id_hash,
      company_name
    } = establishment;

    const role = 'establish';

    return res.json({
      establishment: {
        id,
        id_hash,
        name: company_name,
        email,
        role,
      },
      token: jwt.sign({
        id,
        email
      }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
