import { ReceiptService } from '#services/receipts_service'
import { handleReceiptDownloadsValidator } from '#validators/receipt_downloads_validator'

import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import drive from '@adonisjs/drive/services/main'

export default class ReceiptDownloadsController {
  @inject()
  async handle({ request, response }: HttpContext, receiptService: ReceiptService) {
    const payload = await request.validateUsing(handleReceiptDownloadsValidator)

    const result = await receiptService.findById(payload)

    const localDrive = drive.use('fs')
    const url = await localDrive.getSignedUrl(result.receipt.path, {
      expiresIn: '1 min',
    })

    return { url }
  }
}
