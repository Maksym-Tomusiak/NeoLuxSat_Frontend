export interface UserCreateDto {
  username: string;
  password: string;
}

export interface UserUpdateDto {
  id: string;
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
