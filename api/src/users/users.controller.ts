import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: "Listar todos os usuários" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Lista de usuários retornada com sucesso",
  })
  findAll(@Query("profileId") profileId?: string): User[] {
    if (profileId) {
      return this.usersService.findByProfile(profileId);
    }
    return this.usersService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Buscar um usuário pelo ID" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Usuário encontrado com sucesso",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Usuário não encontrado",
  })
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: "Criar um novo usuário" })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Usuário criado com sucesso",
  })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Atualizar um usuário" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Usuário atualizado com sucesso",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Usuário não encontrado",
  })
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Remover um usuário" })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Usuário removido com sucesso",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Usuário não encontrado",
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param("id") id: string) {
    return this.usersService.remove(id);
  }
}
