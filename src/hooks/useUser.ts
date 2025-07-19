// src/hooks/useUser.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { UserType } from "@/types/user";
import { getUser, setUser } from "@/api/user";

export const useUser = () => {
  const queryClient = useQueryClient();

  // Obtener el usuario
  const userQuery = useQuery<UserType>({
    queryKey: ["user"],
    queryFn: async () => {
      const user = getUser();
      if (!user) throw new Error("Usuario no encontrado");
      return user;
    },
  });

  // Editar el usuario
  const editUser = useMutation({
    mutationFn: async (updatedUser: UserType) => {
      setUser(updatedUser);
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return {
    user: userQuery.data,
    isLoading: userQuery.isLoading,
    isError: userQuery.isError,
    error: userQuery.error,
    refetch: userQuery.refetch,
    editUser,
  };
};
