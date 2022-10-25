import './lib/db';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import userRoute from './routes/user.route';

class App {
  private express: express.Application;
  private readonly port = process.env.PORT || 3333;

  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
    this.listen();
  }

  public getApp(): express.Application {
    this.listen();
    return this.express;
  }

  private middlewares(): void {
    this.express.use(express.json());
    this.express.use(express.raw({ type: 'application/vnd.custom-type' }));
    this.express.use(express.text({ type: 'text/html' }));
    this.express.use(cors());
  }

  private listen(): void {
    this.express.listen(this.port, () => {
      console.log(`Example app listening at http://localhost:${this.port}`);
    });
  }

  private routes(): void {
    this.express.get('/', async (req, res) => {
      res.json({
        message: 'Home'
      });
    });
    this.express.use(userRoute);
  }
}

export { App };
