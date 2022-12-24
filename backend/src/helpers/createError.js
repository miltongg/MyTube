export default function createError(res, status, message) {

    const error = new Error()
    error.status = status
    error.message = message
    return res.status(status).send(error)
}