import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateProfileDto {
  @ApiProperty()
  @IsNotEmpty({ message: "O nome é obrigatório" })
  @IsString({ message: "O nome deve ser uma string" })
  @MinLength(1, { message: "O nome deve ter no mínimo 1 caracteres" })
  name: string;
}
