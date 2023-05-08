export interface Users {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
}

export enum Role {
  ADMIN = 'Admin',
  USER = 'User',
  VISITOR = 'Visitor',
}
