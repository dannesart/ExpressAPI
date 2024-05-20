import axios, { AxiosRequestConfig } from "axios";
import qs from "qs";
import { setupCache } from "axios-cache-adapter";

// Create `axios-cache-adapter` instance
const cache = setupCache({
  maxAge: 15 * 60 * 1000,
});

// Create `axios` instance passing the newly created `cache.adapter`
const api = axios.create({
  adapter: cache.adapter,
});

class ApiClient {
  /**
   * Define POST method
   */
  public async post(url, data, _options) {
    const options: AxiosRequestConfig = {
      headers: { "Content-Type": "application/json" },
      ..._options,
    };
    // const data = qs.stringify(params);
    return await api.post(url, data, options);
  }

  /**
   * Define PUT method
   */
  public async put(url, data, _options) {
    const options: AxiosRequestConfig = {
      headers: { "Content-Type": "application/json" },
      ..._options,
    };
    // const data = qs.stringify(params);
    return await api.put(url, data, options);
  }

  /**
   * Define GET method
   */
  public async get(url, params, headers) {
    const options = {
      headers: { "Content-Type": "application/json", ...headers },
      params: JSON.stringify(params),
    };
    return await api.get(url, options);
  }

  /**
   * Define DELETE method
   */
  public async delete(url, params, headers) {
    const options = {
      headers: { "Content-Type": "application/json", ...headers },
      params: JSON.stringify(params),
    };
    return await api.delete(url, options);
  }
}

export { ApiClient };
