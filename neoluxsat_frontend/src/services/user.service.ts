import type {
  LoginDto,
  UserCreateDto,
  UserDto,
  UserUpdateDto,
} from '@/types/user';
import { HttpClient } from './HttpClient';
import type { PaginationParams } from '@/types/paginationParams';
import { TextService } from './textService';
import type { PaginatedResult } from '@/types/paginatedResult';

export class UserService {
  static async getAllUsers(signal?: AbortSignal): Promise<UserDto[]> {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/users`,
      signal,
    });
    return await httpClient.get('');
  }

  static async getAllUsersPaginated(
    pagination: PaginationParams,
    signal?: AbortSignal
  ): Promise<PaginatedResult<UserDto>> {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/users`,
      signal,
    });
    return await httpClient.get(
      `paginated${TextService.paginationToText(pagination)}`
    );
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
  static async updateUser(user: UserUpdateDto, signal?: AbortSignal) {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/users`,
      signal,
    });
    return await httpClient.put(`/${user.id}`, user);
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
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/users/refresh-token`,
      signal,
      withCredentials: true,
    });
    return await httpClient.post('', {});
  }

  static async logout(signal?: AbortSignal) {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const httpClient = new HttpClient({
      baseURL: `${apiUrl}/users/logout`,
      signal,
      withCredentials: true,
    });

    return await httpClient.post('', {});
  }
}
