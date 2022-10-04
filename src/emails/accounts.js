const nodemailer = require('nodemailer')

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "38d4473407f258",
        pass: "e4774376a2971b"
    }
  });

const sendWelcomeEmail = async (email,name) => {
    await transport.sendMail({
        from: 'afzalmansuri@rapidinnovation.dev',
        to: email,
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Start your journey with creating your first task.`,
    })
}

const sendCancelEmail = async(email,name) => {
    await transport.sendMail({
        from: 'afzalmansuri@rapidinnovation.dev',
        to: email,
        subject: 'Account cancellation!',
        text: `Good bye, ${name}. Waiting for you to joininh again!.`,
        html: '<h1>Get back soon...</h1>'
    })
}


module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
}