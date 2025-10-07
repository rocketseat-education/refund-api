import vine from '@vinejs/vine'

export const createRefundValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(2),
    category: vine.enum(['food', 'hosting', 'transport', 'services', 'other']),
    value: vine.number().positive(),
    receipt: vine
      .string()
      .exists({ table: 'receipts', column: 'id' })
      .unique(async (db, value) => {
        const row = await db.from('receipts').where('id', value).whereNotNull('refund_id').first()
        return row === null
      }),
  })
)

export type CreateRefundValidator = Awaited<ReturnType<typeof createRefundValidator.validate>>

export const showRefundValidator = vine.compile(
  vine.object({
    params: vine.object({
      id: vine.string().uuid(),
    }),
  })
)

export type ShowRefundValidator = Awaited<ReturnType<typeof showRefundValidator.validate>>

export const listRefundValidator = vine.compile(
  vine.object({
    page: vine.number().positive().optional(),
    q: vine.string().trim().optional(),
  })
)

export type ListRefundValidator = Awaited<ReturnType<typeof listRefundValidator.validate>>

export const softDeleteRefundValidator = vine.compile(
  vine.object({
    params: vine.object({
      id: vine.string().uuid(),
    }),
  })
)

export type SoftDeleteRefundValidator = Awaited<
  ReturnType<typeof softDeleteRefundValidator.validate>
>
