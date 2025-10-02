import vine from '@vinejs/vine'

export const createReceiptValidator = vine.compile(
  vine.object({
    receiptFile: vine.file({
      size: '2mb',
      extnames: ['jpg', 'jpeg', 'png', 'pdf'],
    }),
  })
)

export type CreateReceiptValidator = Awaited<ReturnType<typeof createReceiptValidator.validate>>

export const showReceiptValidator = vine.compile(
  vine.object({
    params: vine.object({
      id: vine.string().uuid(),
    }),
  })
)

export type ShowReceiptValidator = Awaited<ReturnType<typeof showReceiptValidator.validate>>

export const deleteReceiptValidator = vine.compile(
  vine.object({
    params: vine.object({
      id: vine.string().uuid(),
    }),
  })
)

export type DeleteReceiptValidator = Awaited<ReturnType<typeof deleteReceiptValidator.validate>>
