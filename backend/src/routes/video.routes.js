import {Router} from "express"
import {
    addVideo,
    addView,
    deleteVideo, getAllVideos,
    getSubs,
    getVideo,
    random,
    trend,
    update
} from "../controllers/video.controller.js"
import verifyToken from "../middlewares/verifyToken.js";

const router = Router()

router.post('/add', verifyToken, addVideo)

router.get('/', getAllVideos)

router.get('/random', random)

router.get('/trend', trend)

router.get('/subs', verifyToken, getSubs)

router.get('/:id', getVideo)

router.put('/update/:id', verifyToken, update)

router.put('/view/:id', addView)

router.delete('/delete/:id', verifyToken, deleteVideo)

export default router