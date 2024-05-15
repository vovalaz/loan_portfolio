import { axios } from "~/lib/axios";
import type { GetCreditTypesResponse } from "~/types";

const getAll = async () => {
  const response = await axios.get<GetCreditTypesResponse>("/api/credit_types");

  return response.data;
};

export const creditTypeService = {
  getAll,
};
