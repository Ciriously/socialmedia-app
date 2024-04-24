import { INewUser } from "@/types";
import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { createUserAccount, signInAccount, signOutAccount } from "../appwrite/api";

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