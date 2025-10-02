import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@adonisjs/lucid/orm'
import { slugify } from '@adonisjs/lucid-slugify'
import { randomUUID } from 'node:crypto'

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

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static assignUuid(receipt: Receipt) {
    receipt.id = randomUUID()
  }
}
