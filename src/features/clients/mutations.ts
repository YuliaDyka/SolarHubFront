import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient, deleteClient, updateClient, type ClientPayload } from "./api";
import { clientsKeys } from "./queryKeys";

export function useCreateClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createClient,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: clientsKeys.all,
      });
    },
  });
}

export function useUpdateClient(clientId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ClientPayload) =>
      updateClient(clientId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: clientsKeys.all,
      });
    },
  });
}

export function useDeleteClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteClient,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: clientsKeys.all,
      });
    },
  });
}