import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCompanyDto {
  @IsString() @IsOptional() name: string;
  @IsEmail() @IsOptional() email: string;
  @IsString() @IsOptional() address: string;
  @IsString() @IsOptional() logo: string;
  @IsNumber() @IsOptional() ownerId: number;
}
