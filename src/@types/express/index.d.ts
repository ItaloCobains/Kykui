import { UserInterface } from '../../interfaces/user.interface';

import 'express';

declare module 'express' {
    interface Request {
        user?: any;
    }
}
