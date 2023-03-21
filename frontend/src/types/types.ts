export interface User {
    _id: string;
    name: string;
    email: string;
    contact: string;
    dob: string;
    image: string;
    password?: string;
    isAdmin?: boolean;
    token?: string;
  }