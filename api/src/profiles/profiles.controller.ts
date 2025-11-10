import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CreateProfileDto } from "./dto/create-profile.dto";
import { ProfilesService } from "./profiles.service";

@Controller("profiles")
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get()
  @ApiOperation({ summary: "Listar todos os perfis" })
  @ApiResponse({
    status: 200,
    description: "Lista de perfis retornada com sucesso",
  })
  findAll() {
    return this.profilesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Buscar um perfil pelo ID" })
  @ApiResponse({ status: 200, description: "Perfil encontrado com sucesso" })
  @ApiResponse({ status: 404, description: "Perfil não encontrado" })
  findOne(@Param("id") id: string) {
    return this.profilesService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: "Criar um novo perfil" })
  @ApiResponse({ status: 201, description: "Perfil criado com sucesso" })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profilesService.create(createProfileDto);
  }

  @Delete(":id")
  @HttpCode(204)
  @ApiOperation({ summary: "Remover um perfil" })
  @ApiResponse({ status: 204, description: "Perfil removido com sucesso" })
  @ApiResponse({ status: 404, description: "Perfil não encontrado" })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param("id") id: string) {
    return this.profilesService.remove(id);
  }
}
