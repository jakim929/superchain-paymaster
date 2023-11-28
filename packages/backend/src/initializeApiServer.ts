import { registerRoutes } from '@/api/registerRoutes'
import { Queue } from 'bullmq'
import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import Fastify from 'fastify'
import cors from '@fastify/cors'

export const initializeApiServer = async (
  db: NodePgDatabase,
  jobQueue: Queue,
) => {
  const fastify = Fastify({
    logger: true,
  })

  await fastify.register(cors, {
    origin: [/^http:\/\/localhost:5173/, /^http:\/\/127\.0\.0\.1:5173/],
  })

  registerRoutes(fastify, db, jobQueue)

  return fastify
}
