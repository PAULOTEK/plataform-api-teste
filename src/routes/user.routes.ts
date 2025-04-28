import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import asyncHandler from 'express-async-handler';

const router = Router();

/**
 * @swagger
 * /users/create:
 *   post:
 *     summary: Cria um novo usuário
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Erro de validação
 */
router.post('/create', asyncHandler(UserController.create));

/**
 * @swagger
 * /users/get:
 *   get:
 *     summary: Lista todos os usuários
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 */
router.get('/get', asyncHandler(UserController.findAll));

export default router;
