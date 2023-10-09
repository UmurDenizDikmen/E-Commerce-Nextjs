import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { Adapter } from "next-auth/adapters";
import { prisma } from "@/lib/prismadb";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { env } from "@/lib/env";
import { mergeBothCarts } from "@/lib/cart";
import { PrismaClient } from "@prisma/client";

export const options: NextAuthOptions = {
  adapter: PrismaAdapter(prisma as PrismaClient) as Adapter,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
  events: {
    async signIn({ user }) {
      await mergeBothCarts(user.id);
    },
  },
};
