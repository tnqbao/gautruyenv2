import { NextApiRequest, NextApiResponse } from "next";
import { userApiInstance } from "@/utils/axios.config";
import { serialize } from "cookie";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try {
        const { email, password, keepLogin } = req.body;
        const shouldKeepLogin = keepLogin === "true";
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const response = await userApiInstance.post("api/user/auth/login", {
            username: email,
            password,
            keepMeLogin : keepLogin.toString()
        });

        if (response.status !== 200) {
            return res.status(response.data).json({ message: response.data });
        }

        const { token, user } = response.data;

        res.setHeader(
            "Set-Cookie",
            serialize("auth_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: shouldKeepLogin ? 60 * 60 * 24 * 7 : undefined,
                sameSite: "strict",
                path: "/",
            })
        );

        return res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Invalid email or password" });
    }
}
