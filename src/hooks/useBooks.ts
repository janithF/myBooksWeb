import { CACHE_KEY_BOOKS } from "@/constants";
import apiClient from "@/services/api-client";
import type { Book } from "@/types";
import { useQuery } from "@tanstack/react-query";

const useBooks = () => {
  const fetchBooks = async () => {
    const res = await apiClient.get<Book[]>("books");
    const data = res.data;
    return data;
  };

  return useQuery<Book[]>({
    queryKey: CACHE_KEY_BOOKS,
    queryFn: fetchBooks,
  });
};

export default useBooks;
