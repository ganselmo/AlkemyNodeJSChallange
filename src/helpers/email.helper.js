const client = require('@sendgrid/mail');
const { SENDGRID_API_KEY,SENDGRID_SENDER, SENDGRID_WELCOME_TEMPLATEID,DOCUMENTATION_URL,API_CREATOR} = process.env;

const sendWelcomeEmail = async (to,firstName,lastName) => {
    client.setApiKey(SENDGRID_API_KEY);

    const message = {
        to,
        from: SENDGRID_SENDER,
        template_id: SENDGRID_WELCOME_TEMPLATEID,
        personalizations:[{
            to,
            dynamic_template_data:{
                firstName,
                lastName,
                docURL:DOCUMENTATION_URL,
                api_creator:API_CREATOR
            }
        }]
      }
    await client
        .send(message)
        .catch(error => {
            throw error;
        });
}


module.exports = { sendWelcomeEmail }