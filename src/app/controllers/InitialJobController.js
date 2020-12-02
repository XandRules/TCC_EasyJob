import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore } from 'date-fns';
import Job from '../models/Job';
import InitialJob from '../models/Initialjob';
import Sequelize from 'sequelize';
import Announcement from '../models/Announcements';
import Establishment from '../models/Establishment';

class InitialJobController {
  async index(req, res) {
    const initialJobs = await InitialJob.findAll();

    return res.json(jobs);
  } 

  async indexById(req, res) {

    try {

      const Op = Sequelize.Op;

     const initialJobs = await InitialJob.findAll({
        
        include:[{
          association : 'announcement',
          required : true,
          attributes : ['title'],
        }] ,
        include:[{
          association: 'establishment',
          required : true ,
          attributes : ["id","company_name"],
          include: [{
            association : 'address',
            required: true,
            attributes :['public_place','number', 'city', 'neighborhood']
          }],
        }],        
        where:{
          announcement_id: {
            [Op.ne]: null
          },
          [Op.or]: [
            { to_user: req.params.id_hash },
            { from_user: req.params.id_hash}
          ]
        }
      });

      console.log("initialJobs", initialJobs)
  
      return res.json(initialJobs);
      
    } catch (error) {
      return res.json({error: error});
    }
  } 

  async indexByIdCount(req, res) {

    try {

      const Op = Sequelize.Op;

      const initialJobs = await InitialJob.count({
        where:{
          announcement_id: {
            [Op.ne]: null
          },
          accepted : {
            [Op.eq]: null
          },
          [Op.or]: [
            { to_user: req.params.id_hash },
            { from_user: req.params.id_hash}
          ]
        }
      });
  
      return res.json(initialJobs);
      
    } catch (error) {
      return res.json({error: error});
    }


  } 

  async store(req, res) {

    try {
        const schema = Yup.object().shape({
          to_user: Yup.string().required(),
          from_user: Yup.string().required(),
          amount: Yup.number().required(),
          comment: Yup.string(),
          date: Yup.date().required(),
          begin_time: Yup.string().required(),
          end_time: Yup.string().required(),
          accepted : Yup.string().default('Pendente'),
          announcement_id: Yup.number().required(),
          establishment_id: Yup.number().required(),
        });
    
        await schema.validate(req.body, {
          abortEarly: false,
        });
    
        const { date } = req.body;
    
        const hourStart = startOfHour(parseISO(date));
    
        if (isBefore(hourStart, new Date())) {
          return res.json({ error: 'Past dates are not permitted' });
        }
    
        const initialJob = await InitialJob.create(req.body);    
    
        return res.json({ initialJob });
      
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          console.log(error);
          return res.json({
            "error": error
          });
        }
      }

  }

  async update(req, res) {

    try {
        const schema = Yup.object().shape({
          accepted : Yup.string().required(),
        });
    
        await schema.validate(req.body, {
          abortEarly: false,
        });    

        const initialJob = await InitialJob.findByPk(req.params.id);

        if(!initialJob){
          return res.json({error: 'Solicitação não encontrada!'})
        }

        const {id , to_user, from_user, comment, begin_time, end_time, date, amount, accepted} = await initialJob.update(req.body);    
    
        return res.json({ 
          id ,
          to_user,
          from_user,
          comment,
          begin_time,
          end_time,
          date,
          amount,
          accepted,
         });
      
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          console.log(error);
          return res.json({
            "error": error
          });
        }
      }

  }

  async delete(req, res) {

    try {
 
        const initialJob = await InitialJob.findByPk(req.params.id);

        if(!initialJob){
          return res.json({error: 'Solicitação não encontrada!'})
        }

        const response = await initialJob.destroy(req.body);    
    
        return res.json({ 
         response
         });
      
      } catch (error) {
       
          console.log(error);
          return res.json({
            "error": error
          });
        
      }

  }
}

export default new InitialJobController();
