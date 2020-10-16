import Freelancer from '../models/freelancer'
import Chat from '../models/Chat'

import * as Yup from 'yup';

class ChatController {

  async index(req, res) {
    res.send('server is running');
  }

  async create(req, res) {

    try {

      const schema = Yup.object().shape({
        room: Yup.string().required(),
        freelancer_id: Yup.number().required(),
        establishment_id: Yup.number().required(),
        announcement_id: Yup.number().required(),
        to_user: Yup.number().required(),
        from_user: Yup.number().required(),
        message: Yup.string(),
      });

      await schema.validate(req.body, {
        abortEarly: false,
      });

      let chat = null;
      try {
        chat = await Chat.create(req.body);
      } catch (error) {
        return res.json({
          error
        });
      }

      return res.json(chat);  

  } catch (error) {
      if (error instanceof Yup.ValidationError) {
        console.log(error);
        return res.json({
          "error": error
        });
      }
    }
  }

  async indexFromUser(req,res){
    try {
      const chat = Chat.findAll({
        where: {
          from_user: req.params.id
        }
      });

      if(!chat){
        return res.json(chat);
      }
    } catch (error) {
      return res.json({"error": error});
    }
  }
}

export default new ChatController();
