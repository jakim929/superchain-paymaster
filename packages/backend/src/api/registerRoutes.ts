import { Queue } from 'bullmq'
import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { FastifyInstance } from 'fastify'

export const registerRoutes = (
  fastify: FastifyInstance,
  db: NodePgDatabase,
  jobQueue: Queue,
) => {
  fastify.get('/healthz', async (request, reply) => {
    reply.code(200).send()
    return
  })
}
