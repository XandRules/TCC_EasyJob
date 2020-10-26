import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore } from 'date-fns';
import Job from '../models/Job';
import InitialJob from '../models/Initialjob';

class InitialJobController {
  async index(req, res) {
    const initialJobs = await InitialJob.findAll();

    return res.json(jobs);
  } 

  async indexById(req, res) {

    try {
      const initialJobs = await InitialJob.findAll({
        where:{
          to_user: req.params.id_hash,
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
          accepted : Yup.boolean().default(false),
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
}

export default new InitialJobController();
