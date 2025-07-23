import prisma from '~~/lib/prisma'

export default defineAPIEventHandler(async () => {
  return await prisma.post.findMany({ include: { author: true } })
})
