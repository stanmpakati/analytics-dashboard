export interface User {
  userId: string;
  email: string;
  firstName: string;
  middleNames: string;
  lastName: string;
  // userStatus: UserStatusType;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
}

export interface AuthDetails {
  username: string,
  password: string
}

export interface AuthResponse {
  // user: UserNameModel,
  token_type: string,
  access_token: string,
  expires_in: number,
}


export enum UserRoles {
  ADMIN = 'ADMIN',
  FINANCE = 'FINANCE',
  MARKETING = 'MARKETING',
  ANALYST = 'ANALYST',
}

export interface User {
  id: number;
  username: string;
  password: string;
  role: UserRoles;
  createdAt: Date;
  // createdBy: string;
  updatedAt: Date;
}