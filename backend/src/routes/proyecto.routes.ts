import { Router } from 'express';
import { ProyectoController } from '../controllers/proyecto.controller';
import { validateCreateProyecto, validateUpdateProyecto, validateIdParam } from '../middleware/validation.middleware';

const router = Router();
const proyectoController = new ProyectoController();

router.get('/', proyectoController.getAllProyectos);
router.get('/:id', validateIdParam, proyectoController.getProyectoById);
router.post('/', validateCreateProyecto, proyectoController.createProyecto);
router.put('/:id', validateIdParam, validateUpdateProyecto, proyectoController.updateProyecto);
router.delete('/:id', validateIdParam, proyectoController.deleteProyecto);

export default router;