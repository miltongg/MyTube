import jwt from "jsonwebtoken"
import createError from "../helpers/createError.js"

export default async function verifyToken(req, res, next) {

    const token = req.cookies.access_token

    try {

        if (!token) {

            createError(res, 401, "You are not authenticated")

        } else {

            jwt.verify(token, process.env.JWT_KEY, (error, user) => {
                if (error) return createError(res, 403, "Not valid token")

                req.user = user.user
                next()
            })

        }

    } catch (error) {
        createError(res, 500, error.message)
    }

}