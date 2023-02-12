const nodemailer = require('nodemailer')

exports.sendEmail = (email, token) => {
 
    var email = email;
    var token = token;

    const transporter = nodemailer.createTransport({
        service: 'SendinBlue', // no need to set host or port etc.
        host: "smtp-relay.sendinblue.com",
        port: 587,
        auth: {
            user: 'ceo.qsquared@gmail.com',
            pass: 'LMC0WsRpSUwD6N2Q'
        }
    });
    var mailOptions = {
        from: 'ceo.qsquared@gmail.com',
        to: email,
        subject: 'Reset Password Link - Tutsmake.com',
        html: '<p>You requested for reset password, kindly use this <a href="http://localhost:4300/reset-password?token=' + token + '">link</a> to reset your password</p>'
 
    };
 
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error)
        } else {
            console.log(0)
        }
    });
}