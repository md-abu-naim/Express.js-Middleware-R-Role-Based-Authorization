import { pool } from "../../DB"
import bcrypt from "bcryptjs";
import type { IUser } from "./user.interface";


const createUserIntoDB = async (payload: IUser) => {
    const { name, email, password, age, role } = payload

    const hassedPassword = await bcrypt.hash(password, 10)

    // const result = await pool.query(`
    //     INSERT INTO users(name, email, password, age) VALUES($1, $2, $3, $4) RETURNING name,email,age,is_active,updated_at,created_at
    //     `, [name, email, hassedPassword, age])

    const result = await pool.query(`
        INSERT INTO users(name, email, password, age, role) VALUES($1, $2, $3, $4, COALASCE($5, 'user')) RETURNING *
        `, [name, email, hassedPassword, age, role])

    delete result.rows[0].password
    return result;
}

const getAllUserFromDB = async () => {
    const result = await pool.query(`
            SELECT * FROM users
            `)
    return result
}

const getSingleUserFromDB = async (id: string) => {
    const result = await pool.query(`
            SELECT * FROM users WHERE id=$1
            `, [id])
    return result
}


const updateUser = async (payload: IUser, id: string) => {
    const { name, password, is_active } = payload

    const result = await pool.query(`
                UPDATE users SET
                 name=COALESCE($1, name),
                  password=COALESCE($2, password),
                   is_active=COALESCE($3, is_active)
    
                 WHERE id=$4 RETURNING *
                `, [name, password, is_active, id])
    return result
}

const deleteUser = async (id: string) => {
    const result = await pool.query(`
            DELETE FROM users WHERE id=$1
            `, [id])

    return result
}

export const userService = {
    createUserIntoDB,
    getAllUserFromDB,
    getSingleUserFromDB,
    updateUser, deleteUser
}