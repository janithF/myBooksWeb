import { CACHE_KEY_BOOKS } from "@/constants";
import apiClient from "@/services/api-client";
import type { Book } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useAddBook = <TFormType>(onAddComplete:()=>void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookData: TFormType) => {
      return apiClient.post<Book>("books", bookData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: CACHE_KEY_BOOKS,
      });
      toast.success("Added the Book Succesfully ");
      onAddComplete()
    },
    onError: (error) => {
      toast.error("Failed to Add the Book", {
        description: error.message,
      });
    },
  });
};

export default useAddBook;
