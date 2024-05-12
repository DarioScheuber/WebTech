
//netlify send mail 
const process = require('process');
const sendgrid = require('@sendgrid/mail');

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async (event) => {
  const { email, name, message } = JSON.parse(event.body);

  const msgToUser = {
    to: email,
    from: 'info@yourdomain.com', // Ihre E-Mail-Adresse
    subject: 'Bestätigung Ihrer Nachricht',
    text: `Hallo ${name},\n\nWir haben Ihre Nachricht erhalten: ${message}\n\nVielen Dank!`
  };

  const msgToAdmin = {
    to: 'cheater99@hotmail.ch', // E-Mail des Administrators
    from: 'info@yourdomain.com',
    subject: 'Neue Nachricht erhalten',
    text: `Sie haben eine neue Nachricht von ${name} erhalten:\n\n${message}`
  };

  try {
    await sendgrid.send(msgToUser);
    await sendgrid.send(msgToAdmin);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Emails successfully sent" })
    };
  } catch (error) {
    return {
      statusCode: error.code,
      body: JSON.stringify({ message: error.message })
    };
  }
};
