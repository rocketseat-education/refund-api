import Refund from '#models/refund'
import {
  CreateRefundValidator,
  ShowRefundValidator,
  SoftDeleteRefundValidator,
} from '#validators/refund_validator'
import { DateTime } from 'luxon'

export class RefundService {
  async all() {
    const refunds = await Refund.findManyBy('deleted_at', null)

    return { refunds }
  }

  async create(payload: CreateRefundValidator) {
    const refund = await Refund.create(payload)

    return { refund }
  }

  async findById(payload: ShowRefundValidator) {
    const refund = await Refund.query().where('id', payload.params.id).whereNull('deleted_at')

    return { refund }
  }

  async softDelete(payload: SoftDeleteRefundValidator) {
    const refund = await Refund.query()
      .where('id', payload.params.id)
      .whereNull('deleted_at')
      .firstOrFail()

    refund.deletedAt = DateTime.local()

    await refund.save()

    return { refund }
  }
}
