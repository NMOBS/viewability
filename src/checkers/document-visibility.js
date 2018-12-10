export const name = 'documentVisibility'

export const check = (element, options) => {
  return options.window.document.hasFocus() && (options.window.document.visibilityState == 'visible')
}

// @TODO
export const support = () => {
  return true
}
