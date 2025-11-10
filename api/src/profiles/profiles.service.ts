import { Injectable, NotFoundException } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import { CreateProfileDto } from "./dto/create-profile.dto";
import { Profile } from "./entities/profile.entity";

@Injectable()
export class ProfilesService {
  private profiles: Profile[] = [];

  findAll(): Profile[] {
    return this.profiles;
  }

  findOne(id: string): Profile {
    const profile = this.profiles.find((p) => p.id === id);

    if (!profile) {
      throw new NotFoundException(`Profile com ID ${id} não encontrado`);
    }

    return profile;
  }

  create(createProfileDto: CreateProfileDto): Profile {
    const newProfile = new Profile({
      id: uuidv4(),
      ...createProfileDto,
    });

    this.profiles.push(newProfile);
    return newProfile;
  }

  remove(id: string): void {
    const profileIndex = this.profiles.findIndex((p) => p.id === id);

    if (profileIndex === -1) {
      throw new NotFoundException(`Profile com ID ${id} não encontrado`);
    }

    this.profiles.splice(profileIndex, 1);
  }
}
