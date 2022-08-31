import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCompanyDto {
  @IsString() name: string;
  @IsEmail() email: string;
  @IsString() address: string;
  @IsString() logo: string;
  @IsString() @IsNotEmpty() user_email: string;
  @IsString() @IsNotEmpty() user_password: string;
  @IsString() @IsNotEmpty() user_name: string;
  @IsString() @IsNotEmpty() user_userName: string;
}
