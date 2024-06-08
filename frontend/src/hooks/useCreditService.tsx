"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { creditService } from "~/services/creditService";
import type { Token } from "~/types";

const useGetAllCredits = (token?: Token) => {
  return useQuery({
    queryKey: ["getAllCredits"],
    queryFn: () => creditService.getAll(token!),
    enabled: !!token,
  });
};

const useApproveCredit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["approveCredit"],
    mutationFn: ({ id, token }: { id: number; token: Token }) =>
      creditService.approveCredit(id, token),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["getAllCredits"],
      }),
  });
};

const useRejectCredit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["rejectCredit"],
    mutationFn: ({ id, token }: { id: number; token: Token }) =>
      creditService.rejectCredit(id, token),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["getAllCredits"],
      }),
  });
};

export const useCreditService = () => {
  return {
    useGetAllCredits,
    useApproveCredit,
    useRejectCredit,
  };
};
