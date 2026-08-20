export const INSERT_EMOJI = 'INSERT_EMOJI'

export interface InsertEmojiMessage {
  type: typeof INSERT_EMOJI
  emoji: string
}

export interface InsertEmojiResponse {
  inserted: boolean
}

export function isInsertEmojiMessage(
  value: unknown,
): value is InsertEmojiMessage {
  if (typeof value !== 'object' || value === null) {
    return false
  }
  const message = value as { type?: unknown; emoji?: unknown }
  return message.type === INSERT_EMOJI && typeof message.emoji === 'string'
}
