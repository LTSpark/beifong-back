const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const databaseConnection = require('./database');

class Server{

    constructor(){
        this.app    = express();
        this.port   = process.env.PORT;

        //database connection
        this.dbConnection();
        //middlewares
        this.middlewares();
        //application routes
        this.routes();
        //swagger documentation
        this.swagger();
        //static content
        this.serveStatic();
    }

    async dbConnection(){
        await databaseConnection();
    }

    middlewares(){
        //CORS
        this.app.use(cors());

        //JSON parse
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));

        //file-upload
        this.app.use(fileUpload({
            limits: { fileSize: 50 * 1024 * 1024 },
        }));

    }

    serveStatic(){
        this.app.use(express.static('public'));
    }

    swagger(){
        const specs = swaggerJsdoc(require('./swaggerOptions'));
        this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
    }

    routes(){
        this.app.use('/api', require('../routes/index'));
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log("Listening port",this.port);
            console.log(`Running on ${process.env.NODE_ENV} environment`);
        });
    }

}

module.exports=Server;
