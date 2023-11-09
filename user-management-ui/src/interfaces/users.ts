export interface User {
    id?: string;
    name: string;
    surname: string;
    age: number;
    email: string;
    phoneNumber: string;
    login: string;
}

export interface NewUser extends User {
    password: string;
}