import * as Yup from "yup";

import Establishment from "../models/Establishment";

class EstablishmentController {
  
  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        company_name: Yup.string().required(),
        social_reason: Yup.string().required(),
        email: Yup.string().email().required(),
        cnpj: Yup.string().required(),
        bio: Yup.string(),
        phone: Yup.string().required(),
        active: Yup.boolean().default(false),
        terms_of_use: Yup.boolean(),
        id_hash: Yup.string().required(),
        password: Yup.string().required().min(6),
        address_id : Yup.number().required(),
      });
  
      await schema.validate(req.body, {
        abortEarly: false,
      });
  
      const establishmentExists = await Establishment.findOne({
        where: {
          email: req.body.email,
        },
      });
  
      if (establishmentExists) {
        return res.status(400).json({
          error: "Establishment already exists.",
        });
      }
  
      let newEstablishment = null;
    
      try {
        newEstablishment = await Establishment.create(req.body);
    
      } catch (error) {
        return res.json({
          error: error.name,
        });
      }
  
      const {
        id,
        company_name,
        social_reason,
        email,
        active,
        cnpj,
        phone,
        id_hash,
      } = newEstablishment;
  
      return res.json({
        id,
        company_name,
        social_reason,
        email,
        active,
        cnpj,
        phone,
        id_hash,
      });
      
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        console.log(error);
        return res.json({
          "error": error
        });
      }
    }
    return res.json({error : error})
  }

  async index(req, res) {
    const establishment = await Establishment.findAll({
      where: {
        active: true,
      },
      atributes: [
        "id",
        "company_name",
        "social_reason",
        "cnpj",
        "email",
        "phone",
        "avatar_id",
        "id_hash",
      ],
    });

    return res.json(establishment);
  }

  async indexById(req, res) {
    let id = req.body;

    const establishment = await Establishment.findAll({
      where: {
        id: req.params.id,
      },
      atributes: [
        "id",
        "company_name",
        "social_reason",
        "cnpj",
        "email",
        "phone",
        "avatar_id",
        "id_hash",
      ],
    });

    return res.json(establishment);
  }

  async update(req, res) {

    console.log('iniciou-se')
    try {
      console.log('try')
      const schema = Yup.object().shape({
        company_name: Yup.string(),
        social_reason: Yup.string(),
        phone: Yup.string(),
        bio: Yup.string(),
        active: Yup.boolean(),
        oldPassword: Yup.string().min(6),
        avatar_id: Yup.number(),
        password: Yup.string()
          .min(6)
          .when("oldPassword", (oldPassword, field) =>
            oldPassword ? field.required() : field
          ),
        confirmPassword: Yup.string().when("password", (password, field) =>
          password ? field.required().oneOf([Yup.ref("password")]) : field
        ),
      });
      
      await schema.validate(req.body, {
        abortEarly: false,
      });

      console.log("Validação");

      const establishment = await Establishment.findByPk(req.params.id);


      console.log("consulta por id", establishment);

      if (!establishment) {
        return res.json({
          error: "Establishment Not found.",
        });
      }


      console.log("achou estabelecimento", req.body);      

      if (oldPassword && !(await establishment.checkPassword(oldPassword))) {
        return res.status(401).json({
          error: "Password does not match",
        });
      }

      console.log("Vai atualizar")

      const { id, company_name, social_reason, bio, phone } = await establishment.update(
        req.body
      );

      return res.json({
        id,
        company_name,
        social_reason,
        bio,
        phone,
      });
    } catch (error) {
      console.log('entrou no catch')
      if (error instanceof Yup.ValidationError) {
        console.log(error);
        return res.json({
          error: error,
        });
      }

      return res.json({
        error: error,
      });
    }
  }
}

export default new EstablishmentController();
