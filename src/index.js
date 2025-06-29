const express = require('express');
const bodyParser = require('body-parser');
const {PORT, REMINDER_BINDING_KEY} = require('./config/serverConfig');
const apiRoutes = require('./routes/index');
const { createChannel, subscribeMessage} = require('./utils/messageQueue');
const jobs = require('./utils/job');
const {sendBasicEmail} = require('./services/email-service')
const { subscribeEvents } = require('./services/email-service')
const setupAndStartServer = async () => {
    const app = express();
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended : true})); 
    app.use('/api', apiRoutes);
    const channel = await createChannel();
    subscribeMessage(channel, subscribeEvents, REMINDER_BINDING_KEY);
    app.listen(PORT, async() => {
        console.log(`The server is start at port ${PORT}`);
        jobs();
        // const res = await sendBasicEmail('ashutoshmzp1221@gmail.com' ,{} );
        // console.log(res);
    })
}

setupAndStartServer();