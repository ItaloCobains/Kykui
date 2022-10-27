/* Defining the interface for the User model. */
export interface UserInterface {
    _id?: any | string;
    name?: string;
    email?: string;
    password?: string;
    avatar?: string;
}

export interface MessageUser extends UserInterface {
    // _id: any;
    // name: string;
    // avatar: string;
    lastMessage: string | null;
    dateLastMessage: Date | null | undefined;
}
