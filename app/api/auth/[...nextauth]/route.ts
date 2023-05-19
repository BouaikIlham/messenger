import NextAuth, {AuthOptions} from "next-auth";
import { PrismaAdapter} from "@next-auth/prisma-adapter";
import TwitterProvider from "next-auth/providers/twitter";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/app/libs/prismadb"

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    provider: [
        TwitterProvider({
            clientId: process.env.TWITTER_CLIENT_ID as string,
            clientSecret: process.env.TWITTER_CLIENT_SECRET as string
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
    ]
}