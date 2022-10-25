import { Router } from 'express';
import { IUser, UserModel } from '../models/user.model';

const routes = Router();

routes.get('/', async (req, res) => {
  try {
    const users: IUser[] = await UserModel.find().exec();
    return res.json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Sorry, something went wrong :/' });
  }
});

routes.post('/', async (req, res) => {
  try {
    const user: IUser = req.body;

    const userExists = await UserModel.findOne({
      email: user.email
    });

    if (userExists) {
      return res
        .status(409)
        .json({ error: 'There is already another email with this name' });
    }

    const newUser = await UserModel.create(user);
    return res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Sorry, something went wrong :/' });
  }
});

export default routes;
