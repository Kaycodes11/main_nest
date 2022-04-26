import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

// dto is simply an object & validate and transform "request object"
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}
