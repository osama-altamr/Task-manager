const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const sendWelocmeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "oaltamr18@gmail.com",
    subject: "Thanks for joining in!",
    text: `Welcome to the app,${name}. Let me know how you get along with the app.`,
  });
};

const sendCancelationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "oaltamr18@gmail.com",
    subject: "Sorry to see you go!",
    text: `Goodbye,${name}. I hope to see you back sometimes soon.`,
  });
};

module.exports = { sendWelocmeEmail, sendCancelationEmail };
