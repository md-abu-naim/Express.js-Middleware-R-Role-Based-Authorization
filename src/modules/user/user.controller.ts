import type { Request, Response } from "express"
import { userService } from "./user.service"

const createUser = async (req: Request, res: Response) => {
    try {

        const result = await userService.createUserIntoDB(req.body)

        res.status(201).json({
            message: "Created Post",
            data: result.rows[0]
        })
    } catch (error: any) {
        res.status(500).json({
            message: error.message,
            error: error
        })
    }
}

const getAllUser = async (req: Request, res: Response) => {
    try {
        const result = await userService.getAllUserFromDB()
        res.status(200).json({
            success: true,
            message: "Users retrived successfully",
            data: result.rows,
        })
    } catch (error: any) {
        res.status(500).json({
            message: error.message,
            error: error
        })
    }
}

const getSingleUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const result = await userService.getSingleUserFromDB(id as string)

        if (result.rows?.length === 0) {
            res.status(404).json({
                success: false,
                message: "User not found",
                data: {},
            })
        }

        res.status(200).json({
            success: true,
            message: "User retrived successfully",
            data: result.rows[0],
        })

    } catch (error: any) {
        res.status(500).json({
            message: error.message,
            error: error
        })
    }
}

const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const result = await userService.updateUser(req.body, id as string)

        if (result.rows?.length === 0) {
            res.status(404).json({
                success: false,
                message: "User not found",
                data: {},
            })
        }

        res.status(200).json({
            success: true,
            message: "User update successfully",
            data: result.rows[0],
        })

    } catch (error: any) {
        res.status(500).json({
            message: error.message,
            error: error
        })
    }
}

const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const result = await userService.deleteUser(id as string)


        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "User not found",
                data: {},
            })
        }

        res.status(200).json({
            success: true,
            message: "User delete successfully",
            data: result.rows[0],
        })

    } catch (error: any) {
        res.status(500).json({
            message: error.message,
            error: error
        })
    }
}

export const userController = {
    createUser, getAllUser, getSingleUser,
    updateUser, deleteUser
}