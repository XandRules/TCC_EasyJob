import * as Yup from 'yup';

import Announcements from '../models/Announcements';
import Freelancer from '../models/freelancer';
import Speciality from '../models/Speciality';
import Specialities from '../models/Speciality';
import Sequelize from 'sequelize';

class AnnouncementsController {
  async store(req, res) {

    try {

      const schema = Yup.object().shape({
        description: Yup.string().required(),
        period: Yup.string().required(),
        title: Yup.string().required(),
        amount: Yup.string().required(),
        day_of_week: Yup.string().required(),
        city: Yup.string().required(),
        freelancer_id: Yup.number().required(),
        speciality_id: Yup.number().required(),
      });

      await schema.validate(req.body, {
        abortEarly: false,
      });


      let newAnnouncements = null;
      try {
        newAnnouncements = await Announcements.create(req.body);
      } catch (error) {
        return res.status(401).json({
          error
        });
      }

      const {
        id,
        title,
        description,
        amount,
        city,
        day_of_week,
        period,
        freelancer_id,
        speciality_id,
      } = newAnnouncements;

      return res.json({
        id,
        title,
        description,
        amount,
        city,
        day_of_week,
        period,
        freelancer_id,
        speciality_id,
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

  async index(req, res) {
    const announcements = await Announcements.findAll({
      atributes: [
        'id',
        'description',
        'title',
        'amount',
        'city',
        'day_of_week',
        'period',
        'freelancer_id',
        'speciality_id',
      ],
    });

    return res.json(announcements);
  }

  async indexByFreelancerId(req, res) {

    console.log("freelancer");
    const announcements = await Announcements.findAll({      
      include:[{
        association : 'freelancer',
        required : true,
      }] ,      
      where: {
        freelancer_id: req.params.id
      },
      atributes: [
        'id',
        'description',
        'title',
        'amount',
        'city',
        'day_of_week',
        'period',
        'freelancer_id',
        'speciality_id',
      ],
    });

    return res.json(announcements);
  }

  async indexById(req, res) {
    
    const announcements = await Announcements.findAll({
      include:[{
        association : 'freelancer',
        required : true,
      }] , 
      where: {
        id: req.params.id
      },
      atributes: [
        'id',
        'description',
        'title',
        'amount',
        'city',
        'day_of_week',
        'period',
        'freelancer_id',
        'speciality_id',
      ],
    });

    return res.json(announcements);
  }

  async update(req, res) {

    try {
      const schema = Yup.object().shape({
        description: Yup.string(),
        period: Yup.string(),
        amount: Yup.string(),
        city: Yup.string(),
        day_of_week: Yup.string(),
        speciality_id: Yup.number(),
      });
  
      await schema.validate(req.body, {
        abortEarly: false,
      });   
  
      const announcements = await Announcements.findByPk(req.params.id);
  
      if (!announcements) {
        return res.status(400).json({
          error: 'Announcements not Found'
        });
      }  
      const {
        id,
        description,
        period,
        amount,
        day_of_week,
        speciality_id,
      } = await announcements.update(req.body);
  
      return res.json({
        id,
        description,
        period,
        amount,
        day_of_week,
        speciality_id,
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
      const announcements = await Announcements.findByPk(req.params.id);

      if (!announcements) {
        return res.status(400).json({
          error: 'Announcements not Found'
        });
      }

      const response = await Announcements.destroy({
        where: {
          id: req.params.id
        }
      });

      return res.json(response);

    } catch (error) {
      return res.json({
        "error": error
      });
    }

  }


  async findAnnouncemetFromFreelancer(req, res) {

    try {

      const announcements = await Announcements.findByPk(req.params.id);
     
      const { title, description, period, amount, city, day_of_week} = announcements;
      const freelancers = await Freelancer.findByPk(announcements.freelancer_id);
      const { id, bio, name, id_hash } = freelancers;
      const specialities = await Specialities.findByPk(announcements.speciality_id);
       const {speciality_function} = specialities;


      if(!announcements){
        return res.json('Anuncio não encontrado');
      }else{

        if(!freelancers){
          return res.json('freelancer não encontrado');
        }else{

          if(!specialities){
            return res.json('especialidade não encontrada');
          }
        }

      }

      const freelancer_id = id;
      const freelancer_id_hash = id_hash;


      return res.json({
        title,
        description,
        period,
        amount,
        city,
        day_of_week,
        bio,
        name,
        freelancer_id,
        freelancer_id_hash,
        speciality_function
      });


    } catch (error) {
      return res.json({
        "error": error
      });
    }

  }

  async findAnnouncemetByFilter(req, res) {

    try {

      const Op = Sequelize.Op;

      console.log(req.body)

      const period = req.body.period != undefined ? req.body.period : '';
      const day_of_week = req.body.day != undefined ? req.body.day : '';
      const city = req.body.city != undefined ? req.body.city : '';

      const speciality = await Speciality.findOne({
          where:{
            speciality_function: req.body.speciality
          }
      });

      console.log(speciality.id)
      
      if(!speciality){
        return res.json('Especialidade não encontrada');
      }
      
      const announcements = await Announcements.findAll({
        include:[{
          association : 'freelancer',
          required : true,
        }],  
        include:[{
          association : 'speciality',
          required : true,
        }],    
        where: {
          speciality_id : speciality.id,      
          period : {
            [Op.substring]: period
          },
          day_of_week : {
            [Op.substring]: day_of_week
          },
          city : {
            [Op.substring]: city
          },
        }
      });    

      if(!announcements){
        return res.json('Anuncio não encontrado');
      }

      console.log(announcements);

      return res.json(announcements);


    } catch (error) {

      console.log(error);
      return res.json({
        "error": error
      });
    }

  }

};

export default new AnnouncementsController();
