import electron, { clipboard } from 'electron'

import copyUrlToClipboard from './copy-url-to-clipboard'

test('should copy string', () => {
  const notificationSpy = jest.spyOn(electron, 'Notification')
  copyUrlToClipboard('string')
  expect(clipboard.readText()).toBe('string')
  expect(notificationSpy).toHaveBeenCalledWith({
    body: 'URL copied to clipboard',
    silent: true,
    title: 'R80 Browser Prompter',
  })
})
