import {NextApiRequest, NextApiResponse} from "next";
import {userApiInstance} from "@/utils/axios.config";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "PUT") {
        res.setHeader("Allow", ["PUT"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    try {
        const {fullname, email, password} = req.body;
        const response = await userApiInstance.put("api/user/auth/register", {
            fullname: fullname,
            email: email,
            password: password,
        });
        if (response.status != 200) {
            res.status(response.status).end(response.data.msg);
        }
        else {
            res.status(200).end("Register success");
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).end("Internal server error");
    }
}