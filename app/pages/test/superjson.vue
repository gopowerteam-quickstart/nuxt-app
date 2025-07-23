<script setup lang="ts">
import type { Prisma } from '@prisma/client'

const { data: data1 } = useRequest('/api/test/superjson')
const data2 = ref()

type PostWithAuthor = Prisma.PostGetPayload<{ include: { author: true } }>
const data3 = ref<PostWithAuthor[]>()

function onRequest() {
  $request('/api/test/superjson').then((res) => {
    data2.value = res
  })
}

function requestTestPrisma() {
  $request('/api/test/prisma').then((res) => {
    data3.value = res
  })
}
</script>

<template>
  <div>
    <table>
      <tbody>
        <tr>
          <td>useRequest:</td>
          <td>{{ data1 }}</td>
        </tr>
        <tr>
          <td>$request:</td>
          <td>{{ data2 }}</td>
        </tr>
        <tr>
          <td>prisam:</td>
          <td>{{ data3 }}</td>
        </tr>
        <tr>
          <td />
          <td>
            <button @click="onRequest">
              发送请求1
            </button>
          </td>
        </tr>
        <tr>
          <td />
          <td>
            <button @click="requestTestPrisma">
              发送请求2
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>
