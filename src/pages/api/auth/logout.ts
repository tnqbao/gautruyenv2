import { NextApiRequest, NextApiResponse } from "next";
import { userApiInstance } from "@/utils/axios.config";
import { serialize } from "cookie";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).json({ status: 405, message: `Method ${req.method} Not Allowed` });
    }

    try {
        const response = await userApiInstance.post("/api/user/auth/logout");

        if (response.status !== 200) {
            return res.status(response.status).json({ status: response.status, message: "Logout failed" });
        }

        res.setHeader(
            "Set-Cookie",
            serialize("auth_token", "", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: -1,
                sameSite: "strict",
                path: "/",
            })
        );

        return res.status(200).json({ status: 200, message: "Logged out successfully" });
    } catch (error) {
        console.error("Logout error:" , error);
    }
}
