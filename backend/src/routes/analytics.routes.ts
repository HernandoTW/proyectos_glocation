import { Router } from 'express';
import { AnalyticsController } from '../controllers/analytics.controller';

const router = Router();
const analyticsController = new AnalyticsController();

router.get('/graficos', analyticsController.getEstadisticas);
router.post('/analisis', analyticsController.generarAnalisisIA);

export default router;