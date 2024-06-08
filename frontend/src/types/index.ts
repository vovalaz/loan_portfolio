import { z } from "zod";

const userSchema = z.object({
  id: z.number(),
  last_login: z.date(),
  is_superuser: z.boolean(),
  first_name: z.string(),
  last_name: z.string(),
  is_staff: z.boolean(),
  is_active: z.boolean(),
  created_at: z.date(),
  updated_at: z.date(),
  email: z.string(),
  password: z.string(),
});
const tokenSchema = z.object({
  access: z.string(),
  refresh: z.string(),
});

export type Token = z.infer<typeof tokenSchema>;

export type User = z.infer<typeof userSchema>;
export type PostUserResponse = Omit<User, "passsword">;
export type PostUserRequest = Pick<
  User,
  "password" | "first_name" | "last_name" | "email"
>;

export type PostTokenResponse = Token;
export type PostTokenRequest = {
  email: string;
  password: string;
};

export type PostRegisterRequest = PostUserRequest;
export type PostRegisterResponse = PostUserResponse;
export type PostLoginRequest = PostTokenRequest;
export type PostLoginResponse = PostTokenResponse;

export type GetUserResponse = Omit<User, "passsword">;
export type GetUsersResponse = GetUserResponse[];

export type PostCreditRequest = {
  amount: number;
  term_months: number;
  credit_type: number;
  purpose: string;
  payments: number[];
};

export type Payment = {
  amount: number;
  deadline: string;
  credit: number;
};

export type Credit = {
  id: number;
  amount: number;
  term_months: number;
  credit_type: number;
  purpose: string;
  status: "draft" | "waiting" | "rejected" | "ongoing" | "paid" | "written_off";
  general_expenses: number;
  payments: Payment[];
  annual_rate: number;
};

export type PostCreditResponse = Credit;

export type CreditType = {
  id: number;
  name: string;
  rate: string;
  min_amount: string;
  max_amount: string;
  min_term_months: string;
  max_term_months: string;
};
export type GetCreditTypesResponse = CreditType[];

export type PatchCreditResponse = Credit;

export type GetCreditsResponse = Credit[];
