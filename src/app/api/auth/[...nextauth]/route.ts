import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Only allow specific emails (your email)
      return user.email === "YOUR_EMAIL@gmail.com";
    },
  },
});

export { handler as GET, handler as POST };