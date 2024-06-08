import { axios } from "~/lib/axios";
import type {
  PostRegisterResponse,
  PostRegisterRequest,
  PostLoginRequest,
  PostLoginResponse,
  Token,
  GetUserResponse,
  GetUsersResponse,
} from "~/types";

const signUp = async (request: PostRegisterRequest) => {
  const response = await axios.post<PostRegisterResponse>(
    "/api/auth/register/",
    request,
  );

  return response.data;
};

const signIn = async (request: PostLoginRequest) => {
  const response = await axios.post<PostLoginResponse>("/api/token/", request);

  return response.data;
};

const getUser = async (token: Token) => {
  const response = await axios.get<GetUserResponse>("/api/users/", {
    headers: {
      Authorization: `Bearer ${token.access}`,
    },
  });

  if (response.status !== 200) {
    return null;
  }

  return response.data;
};

const getUsers = async (token: Token) => {
  const response = await axios.get<GetUsersResponse>("/api/users", {
    headers: {
      Authorization: `Bearer ${token.access}`,
    },
  });

  if (response.status !== 200) {
    return null;
  }

  return response.data;
};

const getMe = async (token: Token) => {
  const response = await axios.get<GetUserResponse>("/api/users/me", {
    headers: {
      Authorization: `Bearer ${token.access}`,
    },
  });

  if (response.status !== 200) {
    return null;
  }

  return response.data;
};

export const authService = {
  signIn,
  signUp,
  getUser,
  getUsers,
  getMe,
};
