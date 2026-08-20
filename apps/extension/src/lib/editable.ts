const SKIP_INPUT_TYPES = new Set([
  'button',
  'checkbox',
  'color',
  'date',
  'datetime-local',
  'file',
  'hidden',
  'image',
  'month',
  'number',
  'password',
  'radio',
  'range',
  'reset',
  'submit',
  'time',
  'week',
])

export function isEditableElement(
  target: EventTarget | null,
): target is HTMLElement {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  if (target instanceof HTMLTextAreaElement) {
    return !target.readOnly && !target.disabled
  }

  if (target instanceof HTMLInputElement) {
    return (
      !target.readOnly &&
      !target.disabled &&
      !SKIP_INPUT_TYPES.has(target.type)
    )
  }

  return target.isContentEditable
}

export function insertIntoElement(el: HTMLElement, text: string): boolean {
  if (!el.isConnected) {
    return false
  }

  if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
    el.focus()
    const start = el.selectionStart ?? el.value.length
    const end = el.selectionEnd ?? el.value.length
    el.setRangeText(text, start, end, 'end')
    el.dispatchEvent(
      new InputEvent('input', {
        bubbles: true,
        cancelable: true,
        data: text,
        inputType: 'insertText',
      }),
    )
    return true
  }

  if (el.isContentEditable) {
    el.focus()
    const selection = window.getSelection()
    if (selection && selection.rangeCount > 0) {
      const inserted = document.execCommand('insertText', false, text)
      if (inserted) {
        el.dispatchEvent(
          new InputEvent('input', {
            bubbles: true,
            cancelable: true,
            data: text,
            inputType: 'insertText',
          }),
        )
        return true
      }
    }

    el.append(text)
    el.dispatchEvent(
      new InputEvent('input', {
        bubbles: true,
        cancelable: true,
        data: text,
        inputType: 'insertText',
      }),
    )
    return true
  }

  return false
}
