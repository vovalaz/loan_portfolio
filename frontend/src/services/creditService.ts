import { axios } from "~/lib/axios";
import type {
  GetCreditsResponse,
  GetPaymentsResponse,
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

const confirmCredit = async (id: number, token: Token) => {
  const response = await axios.patch<PatchCreditResponse>(
    `/api/credits/${id}/`,
    {
      status: "waiting",
    },
    {
      headers: {
        Authorization: `Bearer ${token.access}`,
      },
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

const approveCredit = async (id: number, token: Token) => {
  const response = await axios.patch<PatchCreditResponse>(
    `/api/credits/${id}/`,
    {
      status: "ongoing",
    },
    {
      headers: {
        Authorization: `Bearer ${token.access}`,
      },
    },
  );

  return response.data;
};

const rejectCredit = async (id: number, token: Token) => {
  const response = await axios.patch<PatchCreditResponse>(
    `/api/credits/${id}/`,
    {
      status: "rejected",
    },
    {
      headers: {
        Authorization: `Bearer ${token.access}`,
      },
    },
  );

  return response.data;
};

const getPayments = async (id: number, token: Token) => {
  const response = await axios.get<GetPaymentsResponse>(
    `/api/credits/${id}/payments/`,
    {
      headers: {
        Authorization: `Bearer ${token.access}`,
      },
    },
  );

  return response.data;
};

export const creditService = {
  getAll,
  createCredit,
  confirmCredit,
  approveCredit,
  rejectCredit,
  getPayments,
};
