import Freelancer from '../models/freelancer'
import Chat from '../models/Chat'

import * as Yup from 'yup';
import Establishment from '../models/Establishment';

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
        to_user: Yup.string().required(),
        from_user: Yup.string().required(),
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
      const chat = await Chat.findAll({
        where: {
          to_user: req.params.id_hash
        }
      });

      if(!chat){
        return res.json(chat);
      }

      return res.json(chat);
    } catch (error) {
      return res.json({"error": error});
    }
  }

  async indexChatFromUser(req,res){
    try {
      const chat = await Chat.findAll({
        where: {
          room: req.params.room
        }
      });

      if(!chat){
        return res.json('chat não encontrado!');
      }

      let name = '';

      const {to_user, from_user, room , message} = chat;

      const freelancer = await Freelancer.findOne({
        where:{
          id_hash : to_user
        }
      })

      if(!freelancer){
        console.log('freelancer não encontrado');

        const establishment = await Establishment.findOne({
          where:{
            id_hash : to_user
          }
        });

       name = establishment.company_name;

      }else{
        name = freelancer.name
      }

      return res.json({
        message,
        to_user,
        from_user,
        date,
        name,
        room,
      });
    } catch (error) {
      return res.json({"error": error});
    }
  }
}

export default new ChatController();
