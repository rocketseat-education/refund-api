import { randomUUID } from 'node:crypto'
import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, beforeUpdate, column, hasOne } from '@adonisjs/lucid/orm'
import Receipt from './receipt.js'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import drive from '@adonisjs/drive/services/main'

export default class Refund extends BaseModel {
  static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare title: string

  @column()
  declare category: 'food' | 'hosting' | 'transport' | 'services' | 'other'

  @column({
    meta: 'The value is stored in cents in the database.',
    consume: (value: number) => value / 100,
  })
  declare value: number

  @hasOne(() => Receipt)
  declare receipt: HasOne<typeof Receipt>

  @column.dateTime()
  declare deletedAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static assignUuid(refund: Refund) {
    refund.id = randomUUID()
  }

  @beforeUpdate()
  static async removeRelation(refund: Refund) {
    if (refund.$dirty.deletedAt) {
      await refund.load('receipt')
      const receipt = await Receipt.findOrFail(refund.receipt.id)
      const disk = drive.use()

      await Promise.all([disk.delete(receipt.path), receipt.delete()])
    }
  }
}
