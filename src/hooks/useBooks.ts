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
    queryKey: ["books"],
    queryFn: fetchBooks,
  });
};

export default useBooks;
