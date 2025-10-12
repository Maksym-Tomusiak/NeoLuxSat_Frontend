import type {
  LoginDto,
  UserCreateDto,
  UserDto,
  UserUpdateDto,
} from '@/types/user';
import { HttpClient } from './HttpClient';

export class UserService {
  static async getAllUsers(signal?: AbortSignal): Promise<UserDto[]> {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/users`,
      signal,
    });
    return await httpClient.get('');
  }

  /**
   * @param {object} user
   * @param {AbortSignal} signal
   */
  static async createUser(user: UserCreateDto, signal?: AbortSignal) {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/users`,
      signal,
    });
    return await httpClient.post('', user);
  }

  /**
   * @param {string} id
   * @param {object} user
   * @param {AbortSignal} signal
   */
  static async updateUser(
    id: string,
    user: UserUpdateDto,
    signal?: AbortSignal
  ) {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/users`,
      signal,
    });
    return await httpClient.put(`/${id}`, user);
  }

  /**
   * @param {string} id
   * @param {AbortSignal} signal
   */
  static async deleteUserById(id: string, signal?: AbortSignal) {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/users`,
      signal,
    });
    return await httpClient.delete(`/${id}`);
  }

  static async loginUser(user: LoginDto, signal?: AbortSignal) {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/users/login`,
      signal,
      withCredentials: true,
    });
    return await httpClient.post('', user);
  }

  static async refreshUserToken(signal?: AbortSignal) {
    const refreshToken = localStorage.getItem('refreshToken');

    const payload = { refreshToken: refreshToken };

    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/users/refresh-token`,
      signal,
    });

    return await httpClient.post('', payload);
  }
}
