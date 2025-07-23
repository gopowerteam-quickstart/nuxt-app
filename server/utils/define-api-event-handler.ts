import type { EventHandler, EventHandlerRequest } from 'h3'
import { H3Error } from 'h3'

type AddToJSON<T>
  = T extends Promise<infer U>
    ? Promise<U & { toJSON: () => U }>
    : T & { toJSON: () => T }

export function defineAPIEventHandler<T extends EventHandlerRequest, D>(handler: EventHandler<T, D>): EventHandler<T, AddToJSON<D>> {
  return defineEventHandler<T>(async (event) => {
    try {
      const result = await handler(event)

      switch (typeof result) {
        case 'object':{
          return Object.assign({}, result, {
            toJSON: () => result,
          })
        }
        default:
          return result
      }
    }
    catch (err) {
      if (err instanceof H3Error) {
        throw err
      }
      else {
        throw createError({
          statusCode: 500,
          fatal: false,
        })
      }
    }
  })
}
