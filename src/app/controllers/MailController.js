import nodemailer from "nodemailer";
import mail from '../../config/mail';


class MailController {

  async sendMail(req, res) {

    const {
      name,
      email,
      role,
      type,
      begin_time,
      end_time,
      amount,
      endereco
    } = req.body;

    console.log('Mail', req.body );


    let transporter = nodemailer.createTransport(mail.transport);


    transporter.on('token', token => {
      console.log('A new access token was generated');
      console.log('User: %s', token.user);
    });

    let templateCadastro = `
    <div>

      <div style='background:#4DBFBF;background-color:#4DBFBF;margin:0px auto;max-width:600px;'>
          <table align='center' border='0' cellpadding='0' cellspacing='0' role='presentation'
              style='background:#4DBFBF;background-color:#4DBFBF;width:100%;'>
              <tbody>
                  <tr>
                      <td style='direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;'>

                          <div class='dys-column-per-100 outlook-group-fix'
                              style='direction:ltr;display:inline-block;font-size:13px;text-align:left;vertical-align:top;width:100%;'>
                              <table border='0' cellpadding='0' cellspacing='0' role='presentation'
                                  style='vertical-align:top;' width='100%'>
                                  <tr>
                                      <td align='center'
                                          style='font-size:0px;padding:10px 25px;word-break:break-word;'>
                                          <table border='0' cellpadding='0' cellspacing='0' role='presentation'
                                              style='border-collapse:collapse;border-spacing:0px;'>
                                              <tbody>
                                                  <tr>
                                                      <td style='width:216px;'>
                                                          <img alt='EasyJob' height='189'
                                                              src='https://www.iconfinder.com/data/icons/landmarks-21/100/notre-dame-landmarks-national-symbol-architecture-monument-france-paris-notre-dame-cathedral-512.png'
                                                              style='border:none;display:block;font-size:13px;height:189px;outline:none;text-decoration:none;width:100%;'
                                                              width='216' />
                                                      </td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td align='center'
                                          style='font-size:0px;padding:10px 25px;word-break:break-word;'>
                                          <div
                                              style="color:#FFFFFF;font-family:'Droid Sans', 'Helvetica Neue', Arial, sans-serif;font-size:36px;line-height:1;text-align:center;">
                                              Obrigado por se cadastrar ${name}
                                          </div>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td align='center'
                                          style='font-size:0px;padding:10px 25px;word-break:break-word;'>
                                          <div
                                              style="color:#187272;font-family:'Droid Sans', 'Helvetica Neue', Arial, sans-serif;font-size:16px;line-height:20px;text-align:center;">
                                              Agora falta pouco para que você possa começar na plataforma.
                                          </div>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td align='center'
                                          style='font-size:0px;padding:10px 25px;word-break:break-word;'
                                          vertical-align='middle'>
                                          <table border='0' cellpadding='0' cellspacing='0' role='presentation'
                                              style='border-collapse:separate;line-height:100%;width:200px;'>
                                              <tr>
                                                  <td align='center' bgcolor='#178F8F' role='presentation'
                                                      style='background-color:#178F8F;border:none;border-radius:4px;cursor:auto;padding:10px 25px;'
                                                      valign='middle'>
                                                      <a href='https://easyjobapp.vercel.app/#!/${role}/activate'
                                                          style="background:#178F8F;color:#ffffff;font-family:'Droid Sans', 'Helvetica Neue', Arial, sans-serif;font-size:16px;font-weight:bold;line-height:30px;margin:0;text-decoration:none;text-transform:none;"
                                                          target='_blank'>
                                                          Confirmar
                                                      </a>
                                                  </td>
                                              </tr>
                                          </table>
                                      </td>
                                  </tr>
                              </table>
                          </div>

                      </td>
                  </tr>
              </tbody>
          </table>
      </div>

  </div>
    `;

    let templateJob = `
    <div>

    <div style='background:#4DBFBF;background-color:#4DBFBF;margin:0px auto;max-width:600px;'>
        <table align='center' border='0' cellpadding='0' cellspacing='0' role='presentation'
            style='background:#4DBFBF;background-color:#4DBFBF;width:100%;'>

            <h1 style="padding: 40px;color:#FFF;font-family:'Droid Sans', 'Helvetica Neue', Arial, sans-serif;font-size:40px;line-height:20px;text-align:center;">
                Olá ${name}</h1>

                <h3 style="padding: 40px;color:#FFF;font-family:'Droid Sans', 'Helvetica Neue', Arial, sans-serif;font-size:30px;line-height:20px;text-align:center;">
                    Serviço aceito!</h3>
           
            <tbody>
                <tr>
                    <td style='direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;'>

                        <div class='dys-column-per-100 outlook-group-fix'
                            style='direction:ltr;display:inline-block;font-size:13px;text-align:left;vertical-align:top;width:100%;'>
                            <table border='0' cellpadding='0' cellspacing='0' role='presentation'
                                style='vertical-align:top;' width='100%'>
                                 <tr>
                                    <td align='center'
                                        style='font-size:0px;padding:10px 25px;word-break:break-word;'>
                                        <div
                                            style="color:#FFFFFF;font-family:'Droid Sans', 'Helvetica Neue', Arial, sans-serif;font-size:36px;line-height:1;text-align:center;">
                                           Atenção aos detalhes
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td align='center'
                                        style='font-size:0px;padding:10px 25px;word-break:break-word;'>
                                        <div
                                            style="color:#187272;font-family:'Droid Sans', 'Helvetica Neue', Arial, sans-serif;font-size:16px;line-height:20px;text-align:center;">
                                           
                                            <ol> Hora de entrada : ${begin_time}</ol>
                                            <ol> Hora de saída : ${end_time}</ol>
                                            <ol> Valor por hora : ${amount}</ol>
                                            <ol> Local : ${endereco}</ol>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td align='center'
                                        style='font-size:0px;padding:10px 25px;word-break:break-word;'
                                        vertical-align='middle'>
                                        <table border='0' cellpadding='0' cellspacing='0' role='presentation'
                                            style='border-collapse:separate;line-height:100%;width:200px;'>
                                            <tr>
                                                <td align='center' bgcolor='#178F8F' role='presentation'
                                                    style='background-color:#178F8F;border:none;border-radius:4px;cursor:auto;padding:10px 25px;'
                                                    valign='middle'>
                                                    <a href='https://easyjobapp.vercel.app/#!/job/${role}'
                                                        style="background:#178F8F;color:#ffffff;font-family:'Droid Sans', 'Helvetica Neue', Arial, sans-serif;font-size:16px;font-weight:bold;line-height:30px;margin:0;text-decoration:none;text-transform:none;"
                                                        target='_blank'>
                                                        Confirmar
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>

                    </td>
                </tr>
            </tbody>
        </table>
    </div>

</div>
    `;
    var template = "";

    if(type == 1){
        template = templateCadastro;
    }else{
        template = templateJob;
    }

    transporter.sendMail({
      "from": "xandrules@gmail.com",
      "to": `${email}`,
      "subject": "Confirmação de Cadastro",
      "html": `${template}`
      
    }, (err, info) => {
      if (err) {
        return res.json({
          error: "the email wasn't sent." + err
        });

      } else {
        return res.json({
          success: info
        });
      }
    });


  }
}


export default new MailController();
