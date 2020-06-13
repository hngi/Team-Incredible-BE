const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'microapidev@gmail.com',
    pass: 'micropass',
  },
});

exports.sendMail = (to, subject, html) => {
  const mailOptions = {
    from: 'microapidev@gmail.com',
    to,
    subject,
    html,
  };

  try {
    transport.sendMail(mailOptions);
    return `${subject} mail sent successfully`;
  } catch (error) {
    return 'An error occured, mail not deliverd.';
  }
};
