import { axios } from "~/lib/axios";
import type {
  GetCreditsResponse,
  PatchCreditResponse,
  PostCreditRequest,
  PostCreditResponse,
  Token,
} from "~/types";

const createCredit = async (request: PostCreditRequest) => {
  const response = await axios.post<PostCreditResponse>(
    "/api/credits/",
    request,
  );

  return response.data;
};

const confirmCredit = async (id: number) => {
  const response = await axios.patch<PatchCreditResponse>(
    `/api/credits/${id}/`,
    {
      status: "waiting",
    },
  );

  return response.data;
};

const getAll = async (token: Token) => {
  const response = await axios.get<GetCreditsResponse>("/api/credits/", {
    headers: {
      Authorization: `Bearer ${token.access}`,
    },
  });

  return response.data;
};

export const creditService = {
  getAll,
  createCredit,
  confirmCredit,
};
