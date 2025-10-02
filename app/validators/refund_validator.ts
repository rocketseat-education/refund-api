import vine from '@vinejs/vine'

export const createRefundValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(2),
    category: vine.enum(['food', 'hosting', 'transport', 'services', 'other']),
    value: vine.number().positive(),
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
