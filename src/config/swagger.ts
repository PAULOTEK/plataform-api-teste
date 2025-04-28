import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import path from 'path';

// const options: swaggerJsdoc.Options = {
//     definition: {
//         openapi: '3.0.0',
//         info: {
//             title: 'API Avançada Node.js + Prisma',
//             version: '1.0.0',
//             description: 'Documentação da API usando Swagger',
//         },
//         servers: [
//             {
//                 url: 'http://localhost:3000/api',
//             },
//         ],
//     },
//     apis: [path.resolve(__dirname, '../routes/*.ts')], // caminho absoluto correto
// };
const isProd = process.env.NODE_ENV === 'production';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Avançada Node.js + Prisma',
            version: '1.0.0',
            description: 'Documentação da API usando Swagger',
        },
        servers: [
            {
                url: 'http://localhost:3000/api',
            },
        ],
    },
    apis: [
        isProd ? './dist/routes/*.js' : './src/routes/*.ts',
    ],
};


const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
