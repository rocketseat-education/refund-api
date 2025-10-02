import Receipt from '#models/receipt'
import {
  CreateReceiptValidator,
  DeleteReceiptValidator,
  ShowReceiptValidator,
} from '#validators/receipt_validator'
import app from '@adonisjs/core/services/app'
import { deleteFileFromPath } from '../utils/file.js'

export class ReceiptService {
  async create(payload: CreateReceiptValidator) {
    const receipt = new Receipt()

    receipt.originalFilename = payload.receiptFile.clientName.split(
      `.${payload.receiptFile.extname}`
    )[0]
    receipt.path = payload.receiptFile.filePath ?? payload.receiptFile.tmpPath!
    receipt.extname = payload.receiptFile.extname!

    await receipt.save()

    await payload.receiptFile.move(app.makePath('storage/uploads'), {
      name: `${receipt.filename}.${receipt.extname}`,
    })

    receipt.path = payload.receiptFile.filePath!

    await receipt.save()

    return { receipt }
  }

  async findById(payload: ShowReceiptValidator) {
    const receipt = await Receipt.find(payload.params.id)

    return { receipt }
  }

  async delete(payload: DeleteReceiptValidator) {
    const receipt = await Receipt.findOrFail(payload.params.id)

    await Promise.all([deleteFileFromPath(receipt.path), receipt.delete()])

    return { message: `receipt ${receipt.filename} deleted succesfully.` }
  }
}
