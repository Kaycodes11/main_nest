import { isDefined, IsDefined, IsEmail, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional, getSchemaPath } from '@nestjs/swagger';

// type Pet = Cat | Dog;

export class RegisterUserDto {
  @ApiProperty()
  @IsString()
  @IsDefined()
  firstName!: string;

  @ApiProperty()
  @IsString()
  @IsDefined()
  lastName: string;

  @ApiProperty()
  @IsEmail()
  @IsString()
  @IsDefined()
  email: string;

  @ApiProperty()
  @MaxLength(100)
  @MinLength(6)
  @IsString()
  @IsDefined()
  password: string;

  //   @ApiProperty()
  //   @IsNumber()
  //   @IsDefined()
  //   age: number;

  @ApiProperty()
  @IsString()
  @IsDefined()
  gender: string;

  @ApiProperty()
  @IsString()
  @IsDefined()
  mobile: string;
}
