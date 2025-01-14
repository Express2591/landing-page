import NextAuth, { DefaultSession } from "next-auth";
import GithubProvider from "next-auth/providers/github";

type User = {
  email: string;
} & DefaultSession["user"];

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }: { user: User }) {
      return user.email === "YOUR_EMAIL@gmail.com";
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };