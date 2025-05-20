const sender = require('../config/emailConfig');

const sendBasicEmail = (mailFrom, mailTo, mailSubject, mailBody) => {
    try {
        const response = sender.sendMail({
            from : mailFrom,
            to : mailTo,
            subject : mailSubject,
            text : mailBody
        });
        console.log(response);
    } catch (error) {
        console.log('something went wrong in mailing service');
        throw { error };
    }
    
}

module.exports = {
    sendBasicEmail
}