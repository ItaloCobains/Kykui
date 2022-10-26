import bodyParser from 'body-parser';
import express from 'express';
import helmet from 'helmet';
import userRoutes from '../routes/user.route';
import cors from 'cors';
import morgan from 'morgan';

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());
app.use(express.raw({ type: 'application/vnd.custom-type' }));
app.use(express.text({ type: 'text/html' }));
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

app.get('/', async (req, res) => {
  res.json({ message: 'Home' });
});
app.use('/user', userRoutes);

export { app, port };
