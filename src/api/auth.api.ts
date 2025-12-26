import api from "./http";

export const AuthAPI = {
  login: async (email: string, password: string) => {
    const { data } = await api.post("/auth/login", { email, password });
    return data;
  },

  register: async (email: string, username: string, password: string) => {
    const { data } = await api.post("/auth/register", { email, username, password });
    return data;
  },

  me: async () => {
    const { data } = await api.get("/user/me");
    return data;
  },

  logout: async () => {
    await api.post("/auth/logout");
  },

  refresh: async () => {
    await api.post("/auth/refresh");
  }
};