import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../config";
import { pool } from "../DB";


const auth = () => {
    return async (req: Request, res: Response, next: NextFunction) => {

        const token = req.headers.authorization

        if (!token) {
            res.status(401).json({
                success: false,
                message: "Unauthorized access!!",
            })
        }

        const decoded = jwt.verify(token as string, config.secret as string) as JwtPayload

        const userData = await pool.query(`
            FROM * users WHERE email=$1
            `, [decoded.email])

        const user = userData.rows[0]

        if (userData.rows.length === 0) {
            res.status(404).json({
                message: "User not found!",
                data: {}
            })
        }

        if(!user.is_active){
            res.status(403).json({
                message: "forbidden",
                data: {}
            })
        }
        next()
    }
}

export default auth