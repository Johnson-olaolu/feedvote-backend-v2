import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString() @IsNotEmpty() @IsOptional() email: string;
  @IsString() @IsNotEmpty() @IsOptional() password: string;
  @IsString() @IsNotEmpty() @IsOptional() name: string;
  @IsString() @IsNotEmpty() @IsOptional() address: string;
}
