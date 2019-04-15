const sgmail = require('@sendgrid/mail')
sgmail.setApiKey(process.env.SENDGRIP_API_KEY)

// sgmail.send({
//     to : 'hanmyatthu111@gmail.com',
//     from : 'hanmyatthu111@gmail.com',
//     subject: 'This is my first creation',
//     text : 'I hope this email will be sent'
// })

const sendWelcomeEmail = (email,name) => {
    sgmail.send({
        to : email,
        from : 'hanmyatthu111@gmail.com',
        subject : 'Thank for joining in!',
        text : `Welcome to the app, ${name}.Let me know you get along with the app.`

    })
}

const sendCancelEmail = (email,name) => {
    sgmail.send({
        to : email,
        from : 'hanmyatthu111@gmail.com',
        subject : 'Sorry to see you go',
        text : `Goodbye from the app, ${name}.Let me know you get along with the app.`

    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
}