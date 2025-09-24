import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import User from "@/Models/usermodels";
import { connectMongoDb } from "@/lib/monogodb";
import bcrypt from "bcryptjs";



const authOptions = {
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials) {
                try {
                    const { email, password } = credentials;
                    await connectMongoDb();
                    const finduser = await User.findOne({ email })
                    if (!finduser) return null
                    const isValid = await bcrypt.compare(password, finduser.password
                    );
                    if (!isValid) return null
                    return {
                        id: finduser._id.toString(),
                        username: finduser.username,
                        email: finduser.email,
                    };
                } catch (err) {
                    console.log("error", err)
                }
            },
        }),
    ],
    session: {
        strategy: "jwt"
    },
    secret: process.env.AUTH_SECRET,
    pages: {
        signIn: "/login",
    }
    


};

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }