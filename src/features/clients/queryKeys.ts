import type { ClientsQuery } from "./types";

export const clientsKeys = {
  all: ["client"] as const,
  list: (params: Partial<ClientsQuery>) =>
    [...clientsKeys.all, "list", params] as const,
  detail: (id: string) =>
    [...clientsKeys.all, "detail", id] as const,
};
