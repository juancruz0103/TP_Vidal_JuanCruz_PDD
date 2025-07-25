import express from 'express';
import {
  obtenerOdontologos,
  obtenerOdontologoPorId,
  registrarOdontologo,
  actualizarOdontologoController,
  eliminarOdontologoController
} from './odontologo.controller.js';

const router = express.Router();

router.get('/', obtenerOdontologos);
router.get('/:id', obtenerOdontologoPorId);
router.post('/', registrarOdontologo);
router.put('/:id', actualizarOdontologoController);
router.delete('/:id', eliminarOdontologoController);

export default router;
