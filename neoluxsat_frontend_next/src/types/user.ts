export interface UserCreateDto {
  username: string;
  password: string;
  email: string | null;
  roleId: string;
}

export interface UserUpdateDto {
  id: string;
  username: string | null;
  password: string | null;
  email: string | null;
  roleId: string;
}

export interface LoginDto {
  username: string;
  password: string;
}

export interface UserDto {
  id: string;
  username: string;
  email: string | null;
  roles: string[];
}
