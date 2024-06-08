import { axios } from "~/lib/axios";
import type { GetUserResponse, Token } from "~/types";

const getMe = async (token: Token) => {
  const response = await axios.get<GetUserResponse>("/api/users/me/", {
    headers: {
      Authorization: `Bearer ${token.access}`,
    },
  });

  return response.data;
};

export const userService = {
  getMe,
};
