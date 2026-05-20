import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";
import { USER_ROLe } from "../../types";

const router = Router()

router.post('/', userController.createUser)

router.get('/', auth(USER_ROLe.admin, USER_ROLe.agent), userController.getAllUser)

router.get('/:id', userController.getSingleUser)

router.put('/:id', userController.updateUser)

router.delete('/:id', userController.deleteUser)

export const userRoute = router;