import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  AxiosError,
} from 'axios';

export interface HttpClientConfig extends AxiosRequestConfig {
  baseURL: string;
  withCredentials?: boolean;
}

export class HttpClient {
  private axiosInstance: AxiosInstance;

  constructor(config: HttpClientConfig) {
    this.axiosInstance = axios.create({
      baseURL: config.baseURL,
      withCredentials: config.withCredentials,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...config.headers,
      },
    });

    this.initInterceptors();
  }

  async get<T = any>(url: string, signal?: AbortSignal): Promise<T> {
    return this.request<T>({ method: 'GET', url, signal });
  }

  async post<T = any>(
    url: string,
    data?: any,
    signal?: AbortSignal
  ): Promise<T> {
    return this.request<T>({ method: 'POST', url, data, signal });
  }

  async put<T = any>(
    url: string,
    data?: any,
    signal?: AbortSignal
  ): Promise<T> {
    return this.request<T>({ method: 'PUT', url, data, signal });
  }

  async delete<T = any>(url: string, signal?: AbortSignal): Promise<T> {
    return this.request<T>({ method: 'DELETE', url, signal });
  }

  private async request<T = any>(config: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.request<T>(
        config
      );
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

  private initInterceptors() {
    // Attach token before requests
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Handle 401 responses
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          try {
            const newToken = await this.refreshToken();
            if (newToken) {
              localStorage.setItem('token', newToken);
              // retry original request
              error.config.headers['Authorization'] = `Bearer ${newToken}`;
              return this.axiosInstance.request(error.config);
            }
          } catch {
            console.error('Token refresh failed, redirecting to login...');
            if (!window.location.href.includes('/login')) {
              window.location.href =
                '/login?returnUrl=' + window.location.pathname;
            }
          }
        }
        return Promise.reject(error);
      }
    );
  }

  private async refreshToken(): Promise<string | null> {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      const apiUrl = import.meta.env.VITE_API_BASE_URL;

      const payload = { refreshToken: refreshToken };

      const refreshInstance = axios.create({
        baseURL: apiUrl,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      const response = await refreshInstance.post(
        `/users/refresh-token`,
        payload
      );
      return response.data?.accessToken ?? response.data ?? null;
    } catch (e) {
      console.error('Token refresh failed', e);
      return null;
    }
  }
}
