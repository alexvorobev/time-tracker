export interface SignInType {
  email: string;
  password: string;
}

export interface SignUpType extends SignInType {
  firstName: string;
  lastName: string;
  business?: string;
}

export interface UpdateUserType extends Partial<SignUpType> {
  newPassword?: string;
  repeatPassword?: string;
}

export interface SignUpResponse {
  data: {
    token?: string;
  };
}

export enum RequestType {
  SING_IN,
  SING_UP,
}
