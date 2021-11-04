import { Router } from 'express'
import event from '../controllers/account/eventController.js'

const router = Router()

router.get('/owner-events/:user', event.ownerEvents)
router.get('/edit-events/:eventId', event.infoEditEvent)

router.post('/tao-su-kien', event.taoSuKien)
router.post('/the-loai-event', event.theLoaiEvent)

export default router
