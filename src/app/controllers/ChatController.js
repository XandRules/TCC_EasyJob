import Freelancere from '../models/freelancer'

class ChatController {

  async index(req, res) {
    res.send('server is running');
  }

  async create(req, res) {

    return res.json({"connected": `server is running ${req.body.room}`});
  }
}

export default new ChatController();
