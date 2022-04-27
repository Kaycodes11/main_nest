import { IsDefined, IsOptional } from 'class-validator';

export class RegisterUserDto {
  @IsDefined()
  firstName: string;

  @IsDefined()
  lastName: string;

  @IsDefined()
  age: number;

  @IsOptional()
  hobby: string;
}
