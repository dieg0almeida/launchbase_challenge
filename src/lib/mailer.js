const nodemailer = require('nodemailer');

module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "5b3ea3d4931b55",
      pass: "288d44eb65dd2c"
    }
});