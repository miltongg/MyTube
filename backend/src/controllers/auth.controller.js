import {pool} from "../database.js";
import bcrypt from "bcryptjs";
import {generateToken} from "../helpers/generateToken.js";
import createError from "../helpers/createError.js";


// create user //
export async function signup (req, res) {

    let { name, email, password } = req.body

    password = bcrypt.hashSync(password, 10)

    try {
        let [newUser] = await pool.query(`INSERT INTO users(name, email, password) VALUES(?, ?, ?)`, [name, email, password])

        newUser = {
            ...newUser,
            id: newUser.insertId,
            insertId: newUser.insertId.hidden
        }

        res.send(newUser)

    } catch (error) {
        console.error(error)
        createError(res, 500, error.message)
    }

}

// login //
export async function signin (req, res) {

    const { email, password } = req.body

    try {

        console.log(email, password)

        const [getUser] = await pool.query('SELECT * FROM users WHERE email = ?', [email])

        const user = getUser[0]

        if (user && bcrypt.compareSync(password, user.password)) {

            const {password, ...others} = user

            const token = generateToken(others)

            return res.cookie("access_token", token, {
                httpOnly: true
            })
                .status(200)
                .json(others)
        }

        createError(res, 404, "Wrong email or password")

    } catch (error) {
        console.error(error)
        createError(res, 500, error.message)
    }

}