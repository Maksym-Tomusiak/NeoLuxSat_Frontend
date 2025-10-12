export interface UserCreateDto {
  roleId: string;
  username: string;
  password: string;
}

export interface UserUpdateDto {
  roleId: string;
  username: string | null;
  password: string | null;
}

export interface LoginDto {
  username: string;
  password: string;
}

export interface UserDto {
  id: string;
  username: string;
  roles: string[];
}
