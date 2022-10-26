import bodyParser from 'body-parser';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { InitDB } from './lib/db';
import userRoute from './routes/user.route';
import messageRoute from './routes/message.route';

export class App {
    private express: express.Application;
    private port = process.env.PORT || 9000;

    constructor() {
        this.express = express();
        this.middlewares();
        this.InitMongoDB();
        this.routes();
        this.listen();
    }

    public getApp(): express.Application {
        return this.express;
    }

    private middlewares(): void {
        this.express.use(express.json());
        this.express.use(express.raw({ type: 'application/vnd.custom-type' }));
        this.express.use(express.text({ type: 'text/html' }));
        this.express.use(helmet());
        this.express.use(bodyParser.json());
        this.express.use(cors());
        this.express.use(morgan('combined'));
    }

    private listen(): void {
        this.express.listen(this.port, () => {
            console.log(
                `Example app listening at http://localhost:${this.port}`
            );
        });
    }

    private InitMongoDB(): void {
        InitDB();
    }

    private routes(): void {
        this.express.use('/user', userRoute);
        this.express.use('/message', messageRoute);
    }
}
