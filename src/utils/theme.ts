export function getThemeClass(settings?: any): string {
  if (!settings) return ''

  // Checking for common field names you might use in Payload for background color
  const bgColor = settings.backgroundColor || settings.theme || settings.background

  if (['bg-c1', 'bg-c2', 'bg-c3', 'bg-c4', 'bg-c5', 'bg-c6'].includes(bgColor)) {
    return bgColor
  }

  return ''
}
