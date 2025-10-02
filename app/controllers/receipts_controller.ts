import { ReceiptService } from '#services/receipts_service'
import {
  createReceiptValidator,
  deleteReceiptValidator,
  showReceiptValidator,
} from '#validators/receipt_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class ReceiptsController {
  constructor(private receiptService: ReceiptService) {}
  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    const payload = await request.validateUsing(createReceiptValidator)

    return this.receiptService.create(payload)
  }

  /**
   * Show individual record
   */
  async show({ request }: HttpContext) {
    const payload = await request.validateUsing(showReceiptValidator)

    return this.receiptService.findById(payload)
  }

  /**
   * Delete record
   */
  async destroy({ request }: HttpContext) {
    const payload = await request.validateUsing(deleteReceiptValidator)

    return this.receiptService.delete(payload)
  }
}
