export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  profileId: string;
}

export interface CreateUser {
  firstName: string;
  lastName: string;
  email: string;
  isActive?: boolean;
  profileId: string;
}

export interface UpdateUser {
  firstName?: string;
  lastName?: string;
  email?: string;
  isActive?: boolean;
  profileId?: string;
}
