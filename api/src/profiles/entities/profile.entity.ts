export class Profile {
  id: string;
  name: string;

  constructor(partial: Partial<Profile>) {
    Object.assign(this, partial);
  }
}
