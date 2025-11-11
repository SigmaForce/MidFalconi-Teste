export interface Profile {
  id: string;
  name: string;
}

export interface CreateProfile {
  name: string;
}

export interface UpdateProfile {
  name?: string;
}
