import { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";
import jwt, { JwtPayload, TokenExpiredError } from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const cookies = parse(req.headers.cookie || "");
        if (!cookies.auth_token) {
            return res.status(401).json({ authenticated: false });
        }

        const decoded = jwt.verify(cookies.auth_token, SECRET_KEY) as JwtPayload;

        if (!decoded || typeof decoded !== "object" || !decoded.user_id || !decoded.fullname || !decoded.permission) {
            return res.status(401).json({ authenticated: false, message: "Invalid token structure" });
        }

        return res.status(200).json({ authenticated: true, user: decoded });

    } catch (error) {
        if (error instanceof TokenExpiredError) {
            return res.status(401).json({ authenticated: false, message: "Token expired" });
        }

        console.error("JWT Error:", error);
        return res.status(401).json({ authenticated: false, message: "Invalid token" });
    }
}
