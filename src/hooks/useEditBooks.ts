import type { BookFormValues } from "@/components/BookForm";
import { CACHE_KEY_BOOKS } from "@/constants";
import apiClient from "@/services/api-client";
import type { Book } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useEditBooks = (id: string | undefined, onEditComplete:()=>void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookData: BookFormValues) => {
      return apiClient.patch<Book>(`books/${id}`, bookData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: CACHE_KEY_BOOKS,
      });
      toast.success("updated the Book Succesfully ");
      onEditComplete();
    },
    onError: (error) => {
      toast.error("Failed to Update the Book", {
        description: error.message,
      });
    },
  });
};

export default useEditBooks;
