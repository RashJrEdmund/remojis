import {
  INSERT_EMOJI,
  type InsertEmojiResponse,
  isInsertEmojiMessage,
} from '~/lib/messages'

chrome.runtime.onMessage.addListener(
  (
    message: unknown,
    _sender: chrome.runtime.MessageSender,
    sendResponse: (response: InsertEmojiResponse) => void,
  ) => {
    if (!isInsertEmojiMessage(message)) {
      return
    }

    void chrome.tabs.query({ active: true, currentWindow: true }).then(async (tabs) => {
      const tabId = tabs[0]?.id
      if (tabId === undefined) {
        sendResponse({ inserted: false })
        return
      }

      try {
        const response = (await chrome.tabs.sendMessage(tabId, {
          type: INSERT_EMOJI,
          emoji: message.emoji,
        })) as InsertEmojiResponse
        sendResponse(response ?? { inserted: false })
      } catch {
        sendResponse({ inserted: false })
      }
    })

    return true
  },
)
