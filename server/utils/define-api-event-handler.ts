import type { EventHandler, EventHandlerRequest, H3Event } from 'h3'
import { H3Error } from 'h3'
import superjson from 'superjson'

// 自定义toJSON类型
type CustomToJSON<T>
  = T extends Promise<infer U>
    ? Promise<U & { toJSON: () => U }>
    : T & { toJSON: () => T }

/**
 * 将数据转换为 SuperJSON 格式
 * @param event
 * @param data
 * @returns 转换后的 SuperJSON 数据
 */
function toSuperJSON<T extends EventHandlerRequest, X>(event: H3Event<T>, data: X) {
  // 检查请求头是否包含 x-superjson
  if (!getHeader(event, 'x-superjson')) {
    return data
  }

  // 如果响应已经是 superjson 格式，跳过
  if (event.node.res.getHeader('x-superjson')) {
    return data
  }

  try {
    const serialized = superjson.serialize(data)
    // 设置响应头
    event.node.res.setHeader('content-type', 'application/json')
    event.node.res.setHeader('x-superjson', 'true')

    // 修改响应体
    return {
      json: serialized.json,
      meta: serialized.meta,
    }
  }
  catch (error) {
    console.error('SuperJSON serialization error:', error)
  }
}

/**
 * 定义一个 API 事件处理器，支持 SuperJSON 序列化
 * @param handler
 * @returns 处理后的事件处理器
 */
export function defineAPIEventHandler<T extends EventHandlerRequest, D>(handler: EventHandler<T, D>): EventHandler<T, CustomToJSON<D>> {
  return defineEventHandler<T>(async (event) => {
    try {
      // 调用原始事件处理器
      const data = await handler(event)

      // 如果数据是对象，则转换为 SuperJSON 格式
      if (typeof data === 'object') {
        return toSuperJSON(event, data)
      }
      else {
        return data
      }
    }
    // 处理异常
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
