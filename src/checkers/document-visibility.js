export const name = 'documentVisibility'

export const check = (element, options) => {
  console.log(options.window.document.hasFocus())
  console.log(options.window.document.visibilityState == 'visible')
  return options.window.document.hasFocus() && (options.window.document.visibilityState == 'visible')
}

// @TODO
export const support = () => {
  return true
}
