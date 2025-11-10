import { Profile } from "src/profiles/entities/profile.entity";

export class User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  profileId: string;
  profile?: Profile;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
