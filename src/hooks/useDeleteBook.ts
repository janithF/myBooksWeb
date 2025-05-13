import { CACHE_KEY_BOOKS } from "@/constants";
import apiClient from "@/services/api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteBook = () => {
  const queryClient = useQueryClient();

  const deleteBook = async (id: string) => {
    return apiClient.delete(`books/${id}`);
  };

  return useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: CACHE_KEY_BOOKS,
      });
      toast.success("Deleted the Book Succesfully ");
    },
    onError: (error) => {
      toast.error("Failed to Delete the Book", {
        description: error.message,
      });
    }
  });
};
