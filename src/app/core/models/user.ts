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
  email: string,
  password: string
}

export interface AuthResponse {
  // user: UserNameModel,
  token_type: string,
  access_token: string,
  expires_in: number,
}


export enum UserRoles {
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_FINANCE = 'ROLE_FINANCE',
  ROLE_MARKETING = 'ROLE_MARKETING',
}

export interface User {
  userId: string;
  email: string;
  firstName: string;
  middleNames: string;
  lastName: string;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
}