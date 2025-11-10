import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from "class-validator";

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: "O primeiro nome é obrigatório" })
  @IsString()
  @MinLength(2, { message: "O primeiro nome deve ter no mínimo 2 caracteres" })
  firstName: string;

  @ApiProperty()
  @IsNotEmpty({ message: "O sobrenome é obrigatório" })
  @IsString()
  @MinLength(2, { message: "O sobrenome deve ter no mínimo 2 caracteres" })
  lastName: string;

  @ApiProperty()
  @IsNotEmpty({ message: "O email é obrigatório" })
  @IsEmail({}, { message: "Email inválido" })
  email: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean = true;

  @ApiProperty()
  @IsNotEmpty({ message: "O profileId é obrigatório" })
  @IsUUID("4", { message: "ProfileId deve ser um UUID válido" })
  profileId: string;
}
