import {pool} from "../database.js";
import createError from "../helpers/createError.js";

// create video //
export async function addVideo (req, res) {

    const { title, description, img, videoUrl, tags } = req.body

    try {

        let [rows] = await pool.query(`
            INSERT INTO videos(title, description, img, videoUrl, tags, userId, userName, userPictureUrl) 
            VALUES(?, ?, ?, ?, ?, ?, ?, ?)`,
            [title, description, img, videoUrl, tags, req.user.id, req.user.name, req.user.pictureUrl])

        rows = {
            ...rows,
            id: rows.insertId,
            insertId: rows.insertId.hidden
        }

        res.send(rows)

    } catch (error) {
        console.error(error)
        createError(res, 500, error.message)

    }

}


export async function getVideo (req, res) {

    const { id } = req.params

    try {

        const [video] = await pool.query(`SELECT * FROM videos WHERE id = ?`, [id])

        if (!video[0]) {
            createError(res, 404, 'Video not found')
        } else {
            res.send(video[0])
        }

    } catch (error) {
        console.error(error)
        createError(res, 500, error.message)
    }

}

// GET ALL VIDEOS
export async function getAllVideos (req, res) {


    try {

        const [video] = await pool.query(`SELECT * FROM videos`)
        
        res.send(video)

    } catch (error) {
        console.error(error)
        createError(res, 500, error.message)
    }

}


// update video //
export async function update (req, res) {

    const { id } = req.params
    const { title, description, img, video, tags } = req.body

    try {

        const [findVideo] = await pool.query(`
            SELECT *
            FROM videos
            WHERE id = ?
        `, [id]
        )

        const vid = findVideo[0]

        if (!vid)
            return createError(res, 404, "Video not found")

        if (vid.userId !== req.user.id)
            return createError(res, 403, "Not your video")

        const [rows] = await pool.query(`
            UPDATE videos 
            SET title = IFNULL(?, title),
                description = IFNULL(?, description),
                img = IFNULL(?, img),
                video = IFNULL(?, video),
                tags = IFNULL(?, tags)
            WHERE id = ?
        `, [title, description, img, video, tags, id]
        )

        if (rows.affectedRows === 0)
            return createError(res, 404, 'Video not updated')

        res.send(vid)

    } catch (error) {
        console.error(error)
        createError(res, 500, error.message)
    }

}

// delete video //
export async function deleteVideo (req, res) {

    const { id } = req.params

    try {

        const [findVideo] = await pool.query(`SELECT * FROM videos WHERE id = ?`, [id])

        const vid = findVideo[0]

        if (!vid)
            return createError(res, 404, "Video not found")

        if (vid.userId !== req.user.id)
            return createError(res, 403, "Not your video")

        await pool.query(`
            DELETE FROM videos
            WHERE id = ?
        `, [id]
        )

        res.send("Video deleted successfully")

    } catch (error) {
        console.error(error)
        createError(res, 500, error.message)
    }

}

export async function addView (req, res) {

    const { id } = req.params

    try {

        const [rows] = await pool.query(`UPDATE videos SET views = views + 1 WHERE id = ?`, [id])

        if (rows.affectedRows === 0) {
            createError(res, 404, 'Video not found')
        } else {
            res.send('View incremented')
        }

    } catch (error) {
        console.error(error)
        createError(res, 500, error.message)
    }

}

export async function random (req, res) {

    try {

        const [video] = await pool.query(`SELECT * FROM videos ORDER BY RAND() LIMIT 1`)

        if (!video[0]) {
            createError(res, 404, 'Video not found')
        } else {
            res.send(video[0])
        }

    } catch (error) {
        console.error(error)
        createError(res, 500, error.message)
    }

}

export async function trend (req, res) {

    try {

        const [video] = await pool.query(`SELECT * FROM videos ORDER BY views DESC`)

        res.send(video)

    } catch (error) {
        console.error(error)
        createError(res, 500, error.message)
    }

}

export async function getSubs (req, res) {

    try {

        const [users] = await pool.query(`SELECT * FROM users WHERE id = ${req.user.id}`)

        const subs = users[0].subscribedUsers

        let list = await Promise.all(
            subs.map((channelId) => {
                return pool.query(`SELECT * FROM videos WHERE userId = ${channelId}`)
            })
        )

        // JOIN ARRAYS INTO A SINGLE ARRAY
        const singleArray = list.flat(2)

        // ELIMINATING _BUF OBJS FROM THE ARRAY //
        list = singleArray.filter((obj) => !obj._buf)

        res.send(list.sort((a, b) => b.created_date - a.created_date))

    } catch (error) {
        console.error(error)
        createError(res, 500, error.message)
    }

}
