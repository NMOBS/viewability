export const name = 'cssVisibility'

export const check = (element, options) => {
  const style = options.window.getComputedStyle(element, null)
  const visibility = style.getPropertyValue('visibility')
  const display = style.getPropertyValue('display')

  // Return true if visibility is not hidden or display none
  return (visibility !== 'hidden' && display !== 'none')
}

// @TODO
export const support = () => {
  return true
}
