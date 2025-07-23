import superjson from 'superjson'

type useFetchInterface = typeof useFetch

function parseResponse(responseText: string) {
  return superjson.parse(responseText)
}

// 自定义useRequest函数，添加SuperJSON支持
// 代替useFetch
export const useRequest: useFetchInterface = (url, options) => {
  return useFetch(url, {
    ...options,
    headers: {
      'x-superjson': 'true',
    },
    parseResponse,
  })
}

// 自定义$request函数，添加SuperJSON支持
// 代替$fetch
export const $request = $fetch.create({
  headers: {
    'x-superjson': 'true',
  },
  parseResponse,
})
