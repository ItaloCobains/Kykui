import bodyParser from 'body-parser';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { InitDB } from './lib/db';
import userRoute from './routes/user.route';
import messageRoute from './routes/message.route';

/* It's a class that creates an express application, configures it, and then starts listening
for requests */
export class App {
    private express: express.Application;
    private port = process.env.PORT || 9000;

    /**
     * The constructor function is called when the class is instantiated
     */
    constructor() {
        this.express = express();
        this.middlewares();
        this.InitMongoDB();
        this.routes();
        this.listen();
    }

    /**
     * It returns the express application
     * @returns The express application
     */
    /**
     * The constructor function is called when the class is instantiated
     */
    public getApp(): express.Application {
        return this.express;
    }

    /**
     * The middlewares function is used to configure the middlewares that will be used by the
     * express application
     */
    private middlewares(): void {
        this.express.use(express.json());
        this.express.use(express.raw({ type: 'application/vnd.custom-type' }));
        this.express.use(express.text({ type: 'text/html' }));
        this.express.use(helmet());
        this.express.use(bodyParser.json());
        this.express.use(cors());
        this.express.use(morgan('combined'));
    }

    /**
     * The listen function is a method of the express object that takes a port number and a
     * callback function as parameters
     */
    private listen(): void {
        this.express.listen(this.port, () => {
            console.log(
                `Example app listening at http://localhost:${this.port}`
            );
        });
    }

    /**
     * > The function `InitMongoDB` is a private function that initializes the MongoDB
     * database
     */
    private InitMongoDB(): void {
        InitDB();
    }

    /**
     * This function is used to define the routes of the application
     */
    private routes(): void {
        this.express.get('/', async (req, res) => {
            res.json({ message: 'Home' });
        });
        this.express.use('/user', userRoute);
        this.express.use('/message', messageRoute);
    }
}
