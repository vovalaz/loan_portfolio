import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authService } from "~/services/authService";

interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  image?: string;
  token: {
    access: string;
    refresh: string;
  };
}

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & User;
  }

  type JWT = User;
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    jwt: (params) => {
      return { ...params.token, ...params.user };
    },
    session: ({ session, token }) => {
      const user = token as unknown as User;

      return {
        ...session,
        user: {
          id: token.sub,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          token: user.token,
        },
      };
    },
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter password",
        },
      },
      async authorize(credentials): Promise<User | null> {
        const token = await authService.signIn({
          email: credentials!.email,
          password: credentials!.password,
        });

        if (!token) {
          return null;
        }

        const user = await authService.getMe(token);
        if (!user) return null;

        return {
          id: user.id.toString(),
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          token: token,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
