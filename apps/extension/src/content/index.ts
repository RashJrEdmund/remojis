import { insertIntoElement, isEditableElement } from '~/lib/editable'
import {
  type InsertEmojiResponse,
  isInsertEmojiMessage,
} from '~/lib/messages'

let lastEditable: HTMLElement | null = null

document.addEventListener(
  'focusin',
  (event) => {
    if (isEditableElement(event.target)) {
      lastEditable = event.target
    }
  },
  true,
)

chrome.runtime.onMessage.addListener(
  (
    message: unknown,
    _sender: chrome.runtime.MessageSender,
    sendResponse: (response: InsertEmojiResponse) => void,
  ) => {
    if (!isInsertEmojiMessage(message)) {
      return
    }

    const inserted = lastEditable
      ? insertIntoElement(lastEditable, message.emoji)
      : false
    sendResponse({ inserted })
  },
)
