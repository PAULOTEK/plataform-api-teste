import prisma from '../config/database';

export class UserService {
    static async createUser(data: { name: string; email: string }) {
        if (!data.name || !data.email) {
            throw new Error('Name and email are required');
        }

        return prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
            },
        });
    }

    static async getAllUsers() {
        return prisma.user.findMany();
    }
}
