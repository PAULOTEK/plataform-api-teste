import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
    static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            console.log('Request body:', req.body);  // Verifique o que está sendo recebido

            const { name, email } = req.body;

            // Se o corpo da requisição estiver correto, prossiga
            if (!name || !email) {
                res.status(400).json({ error: 'Name and email are required' });
                return;
            }

            const user = await UserService.createUser({ name, email });
            res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    }

    static async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const users = await UserService.getAllUsers();
            res.json(users);
        } catch (error) {
            next(error);  // Passando o erro para o middleware de erro
        }
    }
}
