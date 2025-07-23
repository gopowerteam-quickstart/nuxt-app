// 创建一个包含复杂数据的测试端点
export default defineAPIEventHandler(() => {
  // 返回包含日期等复杂类型的数据
  return {
    message: 'Hello SuperJSON',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
    metadata: {
      key1: 'value1',
      key2: { nested: 'object' },
    },
    arrValue: [1, 2, 3, 4],
    nullValue: null,
    nested: {
      date: new Date('2023-12-31'),
    },
    mapValue: {
      data: new Map([
        ['key1', 'value1'],
        ['key2', 'value2'],
      ]),
    },
    setValue: {
      data: new Set([1, 2, 3, 4]),
    },
  }
})
