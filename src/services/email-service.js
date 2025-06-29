const sender = require('../config/emailConfig');
const TicketRepository = require('../repository/ticket-repository');
const fs = require('fs');
const path = require('path');
const { loadHtmlTemplate } = require('../utils/loadingTemplete')
const { EMAIL_ID } = require('../config/serverConfig')

const repo = new TicketRepository();

const sendBasicEmail = async (mailTo, templateData) => {
    try {
        console.log('this is the templete' , templateData);
        const filePath = path.join(__dirname, '../templete/ticketCreated.html');
        const htmlBody = loadHtmlTemplate(filePath, {
            ...templateData
        })
        const response = await sender.sendMail({
            from: EMAIL_ID,
            to: mailTo,
            subject: 'Booking Confirmation',
            html: htmlBody
        });
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

const fetchPendingEmails = async (timestamp) => {
    try {
        const response = await repo.get({status: "PENDING"});
        return response;
    } catch (error) {
        console.log(error);
    }
}

const updateTicket = async (ticketId, data) => {
    try {
        const response = await repo.update(ticketId, data);
        return response;
    } catch (error) {
        console.log(error);
    }
}


const createNotification = async (data) => {
    try {
        // console.log(data);
        const response = await repo.create(data);
        return response;
    } catch (error) {
        console.log(error);
    }
}

const subscribeEvents = async (payload) => {
    let service = payload.service;
    let data = payload.data;
    let templateData = payload.templateData;
    switch(service) {
        case 'CREATE_TICKET':
            await createNotification(data);
            await sendBasicEmail(data.recepientEmail, templateData);
            break;
        default: 
            console.log('No valid event received');
            break;
    }
}

module.exports = {
    sendBasicEmail,
    fetchPendingEmails,
    createNotification,
    updateTicket,
    subscribeEvents
}


/**
 * SMTP -> a@b.com
 * receiver-> d@e.com
 * 
 * from: support@noti.com
 */