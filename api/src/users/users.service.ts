import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import { ProfilesService } from "../profiles/profiles.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
  private users: User[] = [];

  constructor(private readonly profilesService: ProfilesService) {}

  findAll(): User[] {
    return this.users;
  }

  findOne(id: string): User {
    const user = this.users.find((u) => u.id === id);

    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    return user;
  }

  findByProfile(profileId: string): User[] {
    return this.users.filter((user) => user.profileId === profileId);
  }

  create(createUserDto: CreateUserDto): User {
    this.profilesService.findOne(createUserDto.profileId);

    const emailExists = this.users.some((u) => u.email === createUserDto.email);

    if (emailExists) {
      throw new BadRequestException("Email já cadastrado");
    }

    const newUser = new User({
      id: uuidv4(),
      ...createUserDto,
      isActive: createUserDto.isActive ?? true,
    });

    this.users.push(newUser);
    return newUser;
  }

  update(id: string, updateUserDto: UpdateUserDto): User {
    const userIndex = this.users.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    if (updateUserDto.profileId) {
      this.profilesService.findOne(updateUserDto.profileId);
    }

    if (updateUserDto.email) {
      const emailExists = this.users.some(
        (u) => u.email === updateUserDto.email && u.id !== id
      );

      if (emailExists) {
        throw new BadRequestException("Email já cadastrado");
      }
    }

    this.users[userIndex] = {
      ...this.users[userIndex],
      ...updateUserDto,
    };

    return this.users[userIndex];
  }

  remove(id: string): void {
    const userIndex = this.users.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    this.users.splice(userIndex, 1);
  }
}
