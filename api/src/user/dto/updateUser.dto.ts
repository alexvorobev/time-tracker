import { PartialType } from '@nestjs/mapped-types';
import { SignUpDto } from './signUp.dto';

export class UpdateUserDto extends PartialType(SignUpDto) {}
