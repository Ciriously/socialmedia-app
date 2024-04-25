import { INewPost, INewUser } from "@/types";
import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { createPost, createUserAccount, getRecentPosts, getUsers, signInAccount, signOutAccount } from "../appwrite/api";
import { QUERY_KEYS } from "./queryKeys";

// Data fetching, caching, infinte scroll

// ============================================================
// AUTH QUERIES
// ============================================================


export const userCreateUserAccount= () => {
  return useMutation({
    mutationFn:(user : INewUser) => createUserAccount(user),
  })
}

export const useSignInAccount = () => {
  return useMutation({
    mutationFn:(user : 
      {email: string; 
      password: string;
    }) => signInAccount(user),
  })
}

export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: signOutAccount,
  });
};
export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: INewPost) => createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
    },
  });
};

export const useGetRecentPosts = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
    queryFn: getRecentPosts,
  });
};

export const useGetUsers = (limit?: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USERS],
    queryFn: () => getUsers(limit),
  });
};