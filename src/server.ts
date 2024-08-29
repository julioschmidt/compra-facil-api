import { Elysia } from 'elysia'
/* import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()  */

const app = new Elysia()
    .get( 
        '/', 
        async () => {
            return 'Hello, Elysia!112313123'
        }
    ) 
    .listen(3000)

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)

console.log('dawd')