import bcrypt from "bcryptjs";
import createError from "../helpers/createError.js";
import {pool} from "../database.js";


// UPDATE USER //
export async function update (req, res) {

    const { id } = req.params

    let { name, email, password } = req.body

    if (password)
        password = bcrypt.hashSync(password, 10)

    try {

        if (Number(id) !== req.user.id)
            return createError(res, 403, "Not your account")

        const [result] = await pool.query(`
            UPDATE users
            SET name = IFNULL(?, name), email = IFNULL(?, email), password = IFNULL(?, password) 
            WHERE id = ?`,
            [name, email, password, id])

        if (result.affectedRows === 0)
            return createError(res, 404, "User not found")

        const [user] = await pool.query('SELECT * FROM users WHERE id = ?', [id])

        if (user[0] && user[0].password)
            user[0].password = user[0].password.hidden

        res.send(user[0])


    } catch (error) {
        console.error(error)
        createError(res, 500, error.message)
    }

}


// GET ONE USER //
export async function getUser (req, res) {

    const {id} = req.params

    try {

        const [user] = await pool.query('SELECT * FROM users WHERE id = ?', [id])

        res.send(user[0])

    } catch (error) {

        createError(res, 500, error.message)

    }

}


// DELETE USER //
export async function deleteUser (req, res) {

    const { id } = req.params

    try {

        if (Number(id) !== req.user.id)
            return createError(res, 403, "Not your account")


        await pool.query('DELETE FROM users WHERE id = ?', [id])

        res.send({message: "User deleted"})

    } catch (error) {
        console.error(error)
        createError(res, 500, error.message)
    }

}


// SUBSCRIBE //
export async function subscribe (req, res) {

    const { id } = req.params

    try {

        const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [req.user.id])
        let user = rows[0]

        user.subscribedUsers = JSON.parse(user.subscribedUsers)

        if (user.subscribedUsers.find((element) => {return element === Number(id)}))
            return createError(res, 401, 'Already subscribed')

        user.subscribedUsers.push(id)

        await pool.query('UPDATE users SET subscribedUsers = ? WHERE id = ?', [`[${user.subscribedUsers}]`, req.user.id])
        await pool.query('UPDATE users SET subscribers = subscribers + 1 WHERE id = ?', [id])

        res.send('Subscribed')

    } catch (error) {
        console.error(error)
        createError(res, 500, error.message)
    }

}

// UNSUBSCRIBE //
export async function unsubscribe (req, res) {

    const { id } = req.params

    try {

        const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [req.user.id])
        let user = rows[0]

        user.subscribedUsers = JSON.parse(user.subscribedUsers)

        const index = user.subscribedUsers.indexOf(Number(id))

        if (index > -1)
            user.subscribedUsers.splice(index, 1)
        else return createError(res, 401, "Already unsubscribed")

        await pool.query('UPDATE users SET subscribedUsers = ? WHERE id = ?', [`[${user.subscribedUsers}]`, req.user.id])
        await pool.query('UPDATE users SET subscribers = subscribers - 1 WHERE id = ?', [id])

        res.send('Unsubscribed')

    } catch (error) {
        console.error(error)
        createError(res, 500, error.message)
    }

}

// LIKE //
export async function like (req, res) {

    const { id } = req.params

    try {

        const [rows] = await pool.query(`SELECT likes, dislikes FROM videos WHERE id = ${id}`)

        let likes = rows[0].likes
        let dislikes = rows[0].dislikes

        likes = JSON.parse(likes);
        dislikes = JSON.parse(dislikes);

        const value = likes.find((element) => {
            return element === req.user.id
        } )

        if (!value)
            likes.push(req.user.id)

        const index = dislikes.indexOf(Number(req.user.id))

        if (index > -1)
            dislikes.splice(index, 1)

        await pool.query(`UPDATE videos SET likes = ?, dislikes = ? WHERE id = ?`, [`[${likes}]`, `[${dislikes}]`, id])

        res.send(likes)

    } catch (error) {
        console.error(error)
        createError(res, 500, error.message)
    }

}


// DISLIKE //
export async function dislike (req, res) {

    const { id } = req.params

    try {

        const [rows] = await pool.query(`SELECT likes, dislikes FROM videos WHERE id = ${id}`)

        let likes = rows[0].likes
        let dislikes = rows[0].dislikes

        likes = JSON.parse(likes)
        dislikes = JSON.parse(dislikes)

        const value = dislikes.find((element) => {
            return element === req.user.id
        } )

        if (!value)
            dislikes.push(req.user.id)

        const index = likes.indexOf(Number(req.user.id))

        if (index > -1)
            likes.splice(index, 1)

        await pool.query(`UPDATE videos SET likes = ?, dislikes = ? WHERE id = ?`, [`[${likes}]`, `[${dislikes}]`, id])

        res.send(dislikes)

    } catch (error) {
        console.error(error)
        createError(res, 500, error.message)
    }

}
