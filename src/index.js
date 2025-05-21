const express = require('express');
const bodyParser = require('body-parser');
const {PORT} = require('./config/serverConfig');
const apiRoutes = require('./routes/index');

const jobs = require('./utils/job')
const setupAndStartServer = () => {
    const app = express();
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended : true})); 
    app.use('/api', apiRoutes);
    app.listen(PORT, () => {
        console.log(`The server is start at port ${PORT}`);
        jobs();
    })
}

setupAndStartServer();