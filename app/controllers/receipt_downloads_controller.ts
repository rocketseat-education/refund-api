import { ReceiptService } from '#services/receipts_service'
import { handleReceiptDownloadsValidator } from '#validators/receipt_downloads_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'

export default class ReceiptDownloadsController {
  @inject()
  async handle({ request, response }: HttpContext, receiptService: ReceiptService) {
    const payload = await request.validateUsing(handleReceiptDownloadsValidator)

    const result = await receiptService.findById(payload)

    const filePath = app.makePath(result.receipt.path)
    const generateEtag = true

    console.log(filePath)

    response.download(filePath, generateEtag)
  }
}
