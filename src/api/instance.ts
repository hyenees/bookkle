import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const fetchClient = () => {
  const instance: AxiosInstance = axios.create({
    baseURL: "http://18.204.229.170:8000",
  });

  instance.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = token ? `Token ${token}` : "";
    return config;
  });

  return instance;
};

export default fetchClient();
