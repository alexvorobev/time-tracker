import { SignInDto } from './signIn.dto';

export class SignUpDto extends SignInDto {
  firstName: string;
  lastName: string;
  bussiness?: string;
}
