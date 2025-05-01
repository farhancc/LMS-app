import express from 'express';
import { isAuthenticated } from '../middlewares/auth';
import { getNotification, updateNotification } from '../controllers/notification.controller';
const router = express.Router();
// autharizeRole('admin') should be added to this
router.route('/notification').get(isAuthenticated, getNotification);
router.route('/notification/:id').put(isAuthenticated, updateNotification);
export default router;
