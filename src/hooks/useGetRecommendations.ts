import { useEffect, useState } from "react";
import { useHttpRequestService } from "../service/HttpRequestService";
import { Author } from "../service";
import { setUser } from "../redux/user";

interface UseGetRecommendationsProps {
  page: number;
}

export const useGetRecommendations = ({ page }: UseGetRecommendationsProps) => {
  const [users, setUsers] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Nuevo estado para verificar si hay más elementos
  const service = useHttpRequestService();

  const getUsers = async () => {
    try{
      const users = await service.getRecommendedUsers(10, page);
      users.length === 0 
      ? setHasMore(false)
      : setUser((prev:Author[]) => [...prev, ...users]);
    }catch(error){
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (page !== undefined && hasMore) {
      setLoading(true);
      getUsers().then(()=>setLoading(false));
    }
  }, [page, hasMore]);

  return { users, loading, error };
};
