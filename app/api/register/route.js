import User from "@/Models/usermodels";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectMongoDb } from "@/lib/monogodb";


export async function POST(req) {
    try {
        await connectMongoDb();
        const { username, email, password } = await req.json();

        const finduser = await User.findOne({ email })
        if (finduser) {
            return NextResponse.json({ message: "User already exits, You can login", success: false },{status: 409})
        }
        const HashedPassword = await bcrypt.hash(password, 10)

        await User.create({
            username,
            email,
            password: HashedPassword
        })


        return NextResponse.json({ message: "User Register Sucessfully", success: true }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: error, success: false }, { status: 500 })
    }

}