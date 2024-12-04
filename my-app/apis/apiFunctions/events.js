import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiRoutes from "../apiRoute";
import api from "../axios";

export const useGetEvents = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: [apiRoutes.EVENT.GET_EVENT],
    queryFn: () => api.get(apiRoutes.EVENT.GET_EVENT),
    retry: 1,
    staleTime: 7 * 24 * 60 * 60 * 1000,
  });
  return { isPending, isError, data: data?.data?.events ?? [], error };
};

export const usePostEvents = () => {
  let QueryClient = useQueryClient();
  const {
    mutate: postEvent,
    data,
    isError,
    error,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: (data) => api.post(apiRoutes.EVENT.POST_EVENT, data),
    onSuccess: (reponse) => {
      QueryClient.invalidateQueries({ queryKey: [apiRoutes.EVENT.GET_EVENT] });
      alert("Event Add SuccessFully");
    },
    onError: (error) => {
      alert("Error...");
    },
  });
  return { postEvent, data, isError, error, isPending, isSuccess };
};
