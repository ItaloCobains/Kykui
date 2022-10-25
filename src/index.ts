import './lib/db';
import express from 'express';
import userRoutes from './routes/user.route';

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());
app.use(express.raw({ type: 'application/vnd.custom-type' }));
app.use(express.text({ type: 'text/html' }));

app.get('/', async (req, res) => {
  res.json({ message: 'Home' });
});
app.use('/user', userRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
