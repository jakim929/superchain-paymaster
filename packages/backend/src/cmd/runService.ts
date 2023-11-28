import { BackendService } from '@/BackendService'

const run = async () => {
  const service = await BackendService.init().catch((e) => {
    console.error('BackendService failed to initialize', e)
    process.exit(1)
  })
  await service.run().catch((e) => {
    console.error('BackendService failed to run', e)
    process.exit(1)
  })
}

run()
