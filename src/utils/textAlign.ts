export function getTextAlignment(settings?: any): string {
  if (!settings) return ''

  // Checking for common field names you might use in Payload for background color
  const textAlign = settings.textAlign

  if (textAlign === 'left') return 'text-left'
  if (textAlign === 'right') return 'text-right'
  if (textAlign === 'center') return 'text-center'

  return ''
}
