import express from 'express';
import { connectToDB } from '../controllers/db-controller';

const router = express.Router()

router.get('/', connectToDB );