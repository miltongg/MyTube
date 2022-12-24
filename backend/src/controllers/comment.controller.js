import createError from "../helpers/createError.js";
import {pool} from "../database.js";


export async function addComment (req, res) {

    const { videoId, comment } = req.body

    try {

        let [newComment] = await pool.query(`INSERT INTO comments(userId, videoId, comments) VALUES(?, ?, ?)`, [req.user.id, videoId, comment])

        newComment = {
            ...newComment,
            id: newComment.insertId,
            insertId: newComment.insertId.hidden
        }

        res.send(newComment)

    } catch (error) {
        console.error(error)
        createError(res, 500, error.message)
    }

}

export async function getComments (req, res) {

    const { videoId } = req.params

    try {

        const [comments] = await pool.query(`SELECT * FROM comments WHERE videoId = ${videoId}`)


        if (comments.length === 0) {
            createError(res, 404, 'Comments not found')
        } else {
            res.send(comments)
        }

    } catch (error) {
        console.error(error)
        createError(res, 500, error.message)
    }

}

export async function deleteComment (req, res) {

    const { id } = req.params

    try {

        const [comments] = await pool.query(`SELECT * FROM comments WHERE id = ${id}`)
        const comment = comments[0]

        if (!comment)
            return createError(res, 404, 'Comment not found')

        const [videos] = await pool.query(`SELECT * FROM videos WHERE id = ${comment.videoId}`)
        const video = videos[0]

        if (req.user.id === Number(comment.userId) || req.user.id === video.userId) {
            await pool.query(`DELETE FROM comments WHERE id = ${id}`)
            res.send('Comment deleted')
        } else {
            createError(res, 403, 'Not your comment')
        }

    } catch (error) {
        console.error(error)
        createError(res, 500, error.message)
    }

}