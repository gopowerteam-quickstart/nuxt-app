import superjson from 'superjson'

export default defineNitroPlugin((nitroApp) => {
  // 使用 Nitro 的 beforeResponse 钩子
  nitroApp.hooks.hook('beforeResponse', (event, response) => {
    // 只处理 API 路由
    if (!event.path.startsWith('/api')) {
      return
    }

    // 跳过非成功的响应
    if (event.node.res.statusCode >= 400) {
      return
    }

    // 如果响应已经是 superjson 格式，跳过
    if (event.node.res.getHeader('x-superjson')) {
      return
    }

    // 只处理对象和数组类型的响应
    if (response.body && (typeof response.body === 'object' || Array.isArray(response.body))) {
      try {
        const serialized = superjson.serialize(response.body)

        // 设置响应头
        event.node.res.setHeader('content-type', 'application/json')
        event.node.res.setHeader('x-superjson', 'true')

        // 修改响应体
        response.body = {
          json: serialized.json,
          meta: serialized.meta,
        }
      }
      catch (error) {
        console.error('SuperJSON serialization error:', error)
      }
    }
  })
})
