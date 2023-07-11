import express from 'express';
import auth from '../middlewares/auth.js';
import {
   createSubscription,
    getSubscription,
    updateSubscription,
deleteSubscription
  } from "../controllers/subscription.js";

const router = express.Router();

router.post('/subscription', createSubscription);
router.get('/subscription/:id', auth, getSubscription);
router.patch('/subscription/:id', auth, updateSubscription);
router.delete('/subscription/:id', auth, deleteSubscription);

export default router;
