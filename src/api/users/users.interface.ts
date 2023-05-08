export interface Users {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
}

export interface IUserRO {
  id: string;
}

export enum Role {
  ADMIN = 'Admin',
  USER = 'User',
  VISITOR = 'Visitor',
}
