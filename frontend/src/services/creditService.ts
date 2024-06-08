import { axios } from "~/lib/axios";
import type {
  PatchCreditResponse,
  PostCreditRequest,
  PostCreditResponse,
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

export const creditService = {
  createCredit,
  confirmCredit,
};
