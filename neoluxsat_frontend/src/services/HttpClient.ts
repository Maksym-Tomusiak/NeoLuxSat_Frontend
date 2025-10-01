import axios from 'axios';
import {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from 'axios';

export interface HttpClientConfig extends AxiosRequestConfig {
  baseURL: string;
  headers?: Record<string, string>;
}

export class HttpClient {
  private axiosInstance: AxiosInstance;
  private signal?: AbortSignal;

  constructor(configs: HttpClientConfig, signal?: AbortSignal) {
    this.axiosInstance = axios.create({
      baseURL: configs.baseURL,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...configs.headers,
      },
    });

    this.signal = signal;
  }

  async get<T = any>(url: string, config: AxiosRequestConfig = {}): Promise<T> {
    return this.request<T>({ method: 'GET', url, ...config });
  }

  async post<T = any>(
    url: string,
    data?: any,
    config: AxiosRequestConfig = {}
  ): Promise<T> {
    return this.request<T>({ method: 'POST', url, data, ...config });
  }

  async put<T = any>(
    url: string,
    data?: any,
    config: AxiosRequestConfig = {}
  ): Promise<T> {
    return this.request<T>({ method: 'PUT', url, data, ...config });
  }

  async delete<T = any>(
    url: string,
    config: AxiosRequestConfig = {}
  ): Promise<T> {
    return this.request<T>({ method: 'DELETE', url, ...config });
  }

  private async request<T = any>(config: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.request<T>({
        ...config,
        signal: this.signal,
      });
      return response.data;
    } catch (error: unknown) {
      if (axios.isCancel(error)) {
        console.info('Request was cancelled');
      } else if (error instanceof AxiosError) {
        console.error('Request failed with error', error.response?.statusText);
      } else if (error instanceof Error) {
        console.error('Unexpected error occurred', error.message);
      }
      return Promise.reject(error);
    }
  }
}
