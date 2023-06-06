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