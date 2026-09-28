export function getTextAlignment(settings?: any): string {
  if (!settings) return ''

  // Checking for common field names you might use in Payload for background color
  const textAlign = settings.textAlign

  if (textAlign === 'left') return 'text-left'
  if (textAlign === 'right') return 'text-right'
  if (textAlign === 'center') return 'text-center'

  return ''
}

export function getBlockAlignment(settings?: any): string {
  if (!settings) return 'mx-auto'

  const textAlign = settings.textAlign

  if (textAlign === 'left') return 'mr-auto ml-0'
  if (textAlign === 'right') return 'ml-auto mr-0'

  return 'mx-auto'
}
