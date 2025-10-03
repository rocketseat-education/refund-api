import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import { slugify } from '@adonisjs/lucid-slugify'
import { randomUUID } from 'node:crypto'
import Refund from './refund.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Receipt extends BaseModel {
  static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare originalFilename: string

  @column()
  @slugify({
    strategy: 'shortId',
    fields: ['originalFilename'],
  })
  declare filename: string

  @column()
  declare extname: string

  @column()
  declare path: string

  @column()
  declare refundId: string | null

  @belongsTo(() => Refund)
  declare refund: BelongsTo<typeof Refund>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static assignUuid(receipt: Receipt) {
    receipt.id = randomUUID()
  }
}
