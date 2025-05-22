import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  API_PREFIX: z.string().min(1),
  API_PORT: z.coerce.number().default(3000),
  THROTTLE_TTL: z.number().min(1),
  THROTTLE_LIMIT: z.number().min(1),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('❌ Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables.')
}

export const env = _env.data
