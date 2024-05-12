const process = require('process');
const sendgrid = require('@sendgrid/mail');

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async (event) => {
    try {
        const { email, name, message } = JSON.parse(event.body);
        const msgToUser = {
            to: email,
            from: 'info@tourdebier.netlify.app.com',
            subject: 'Bestätigung Ihrer Nachricht',
            text: `Hallo ${name},\n\nWir haben Ihre Nachricht erhalten: ${message}\n\nVielen Dank!`
        };

        const msgToAdmin = {
            to: 'janis.felder@stud.hslu.ch',
            from: 'info@tourdebier.netlify.app.com',
            subject: 'Neue Nachricht erhalten',
            text: `Sie haben eine neue Nachricht von ${name} erhalten:\n\n${message}`
        };

        await sendgrid.send(msgToUser);
        await sendgrid.send(msgToAdmin);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Emails successfully sent" })
        };
    } catch (error) {
        console.error('Error parsing JSON:', error);
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Invalid JSON input' })
        };
    }
};
