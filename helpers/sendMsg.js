const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const {SENDGRID_API_KEY} = process.env;

const sendMsg = async (email, verificationToken) => {
	try {
		await sgMail.setApiKey(SENDGRID_API_KEY);

		const msg = {
			to: email,
			from: 's_veronica@ukr.net',
			subject: 'Email verification',
			html: `<a target='_blank' href='http://Localhost:3000/api/users/verify/${verificationToken}'>Confirm email</a>`
		};

		await sgMail.send(msg);
		return true;
  } catch (error) {
    console.error(error);
  };
};

module.exports = sendMsg;