import vine from '@vinejs/vine'

export const handleReceiptDownloadsValidator = vine.compile(
  vine.object({
    params: vine.object({
      id: vine.string().uuid(),
    }),
  })
)

export type HandleReceiptDownloadsValidator = Awaited<
  ReturnType<typeof handleReceiptDownloadsValidator.validate>
>
