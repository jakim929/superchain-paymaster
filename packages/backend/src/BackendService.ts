import { connectToDatabase } from '@/database/connectToDatabase'
import { runMigrations } from '@/database/runMigrations'
import { envVars } from '@/envVars'
import { initializeApiServer } from '@/initializeApiServer'
import { initializeJobQueue } from '@/initializeJobQueue'
import { TEST_CONSOLE_LOG } from '@/jobs/testConsoleLog'
import { sleep } from '@/lib/sleep'

import { Queue } from 'bullmq'
import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { FastifyInstance } from 'fastify'

export class BackendService {
  constructor(
    private readonly db: NodePgDatabase,
    private readonly jobQueue: Queue,
    private readonly apiServer: FastifyInstance,
  ) {}

  static async init() {
    console.log('[BackendService] Running migrations...')
    await runMigrations()

    console.log('[BackendService] Connecting to database...')
    const db = connectToDatabase()

    console.log('[BackendService] Initializing job queue...')

    const jobQueue = initializeJobQueue()

    console.log('[BackendService] Initializing api server...')

    const apiServer = await initializeApiServer(db, jobQueue)

    return new BackendService(db, jobQueue, apiServer)
  }

  async loop() {
    console.log('[BackendService] Looping...')
    this.jobQueue.add(TEST_CONSOLE_LOG, {
      testDate: Date.now(),
    })
  }

  async run() {
    await this.apiServer.listen({ port: envVars.PORT, host: envVars.HOST })

    while (true) {
      await this.loop()
      await sleep(envVars.LOOP_INTERVAL_MS)
    }
  }
}
