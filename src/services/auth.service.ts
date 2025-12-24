// src/services/auth.service.ts
import { apiFetch } from "./Api";

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  message: string; // "Logged in"
};

export async function login(data: LoginRequest) {
  // нічого не зберігаємо, просто викликаємо
  return apiFetch<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function me() {
  // бекенд сам читає accessToken з cookies
  return apiFetch<{
    id: string;
    email: string;
    name?: string;
  }>("/user/me");
}

export async function logout() {
  // бекенд очистить cookies
  return apiFetch("/auth/logout", {
    method: "POST",
  });
}
