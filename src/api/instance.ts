import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const fetchClient = () => {
  const instance: AxiosInstance = axios.create({
    // baseURL: "http://192.168.0.2:8000",
    baseURL: "http://localhost:3000/data",
    withCredentials: true,
  });

  instance.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = token ? `Token ${token}` : "";
    return config;
  });

  return instance;
};

export default fetchClient();
