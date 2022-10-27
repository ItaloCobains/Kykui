import { UserInterface } from '../../interfaces/user.interface';

import 'express';

/* Extending the Request interface of express. */
declare module 'express' {
    /* Extending the Request interface of express. */
    interface Request {
        user?: UserInterface;
        userChat?: UserInterface;
    }
}
