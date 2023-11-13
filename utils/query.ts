import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import CookieManager from '@react-native-cookies/cookies';

const $fetcher = axios.create({
  baseURL: 'https://hrm-develop.i-novus.ru/',
  responseType: 'json',
});

type Log = {
  type: 'request' | 'response';
  value: AxiosResponse | AxiosRequestConfig;
};

let headers: Record<string, string> = {};
let cookies: Record<string, string> = {};

export function configure($headers: Record<string, string>): void {
  // Update header for next calls
  headers = $headers;
  
  // Destruct the cookies string to an object { key: value }
  cookies = $headers.cookie.split(';').reduce((acc, cur) => {
    const [key, value] = cur.split('=');

    if (key.length > 0) {
      acc = {[key]: value};
    }

    return acc;
  }, {});
}

const _get = $fetcher.get;
const _post = $fetcher.post;

$fetcher.get = function get(url: string, config?: AxiosRequestConfig) {
  return new Promise((resolve) => {
    // Clear all cookies
    CookieManager.clearAll().then(() => {
      // reconstruct each cookie with the native value provided
      // const promises = entries(cookies).map(([name, value]) =>
      //   CookieManager.set($baseUrl, {
      //     name,
      //     value,
      //   }),
      // );

      // After all cookies were resolved, continue with the fetch
      // Promise.all(promises).then(() => {
      //   resolve(
      //     _get(
      //       url,
      //       config
      //         ? {
      //             ...config,
      //             headers,
      //           }
      //         : {
      //             headers,
      //           },
      //     ),
      //   );
      // });
    });
  });
};

$fetcher.post = function post(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
) {
  return new Promise((resolve) => {
    CookieManager.clearAll().then(() => {
      resolve(
        _post(
          url,
          data,
          config
            ? {
                ...config,
                headers,
              }
            : {
                headers,
              },
        ),
      );
    });
  });
};

export default function fetcher(): AxiosInstance {
  return $fetcher;
}