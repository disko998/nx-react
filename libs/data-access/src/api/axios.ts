import axios, { AxiosRequestConfig } from 'axios';

export const PROD_URL = 'https://api.charlycares.com/api/';
export const TEST_URL = 'https://test.charlycares.com/api/';

export const BASE_URL =
  process.env.NODE_ENV === 'production' ? PROD_URL : TEST_URL;

export const api = axios.create({
  baseURL: `${BASE_URL}v1/`,
});

const authenticationRequestInterceptor = async (
  config: AxiosRequestConfig,
  getAuthToken?: () => Promise<string | null>
) => {
  const newConfig = { ...config };
  const token = await getAuthToken?.();

  if (config.baseURL && token) {
    newConfig.headers.common.Authorization = `Bearer ${token}`;
  }

  return newConfig;
};

const versionRequestInterceptor = (
  config: AxiosRequestConfig
): AxiosRequestConfig => {
  const newConfig = { ...config };

  if (newConfig.url?.includes('v1') || newConfig.url?.includes('v2')) {
    newConfig.baseURL = BASE_URL;
  }

  return newConfig;
};

api.interceptors.request.use(versionRequestInterceptor);

export const setTokenInterceptor = (getToken: () => Promise<string | null>) => {
  api.interceptors.request.use((config: AxiosRequestConfig) =>
    authenticationRequestInterceptor(config, getToken)
  );
};
