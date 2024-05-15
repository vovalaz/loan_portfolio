import { axios } from "~/lib/axios";
import type { PostCreditRequest, PostCreditResponse } from "~/types";

const createCredit = async (request: PostCreditRequest) => {
  const response = await axios.post<PostCreditResponse>(
    "/api/credits",
    request,
  );

  return response.data;
};

export const creditService = {
  createCredit,
};
