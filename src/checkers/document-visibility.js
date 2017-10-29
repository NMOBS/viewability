export const name = 'documentVisibility'

export const check = (element, opions) => {
  return document.hasFocus() || (document.visibilityState == 'visible')
}

// @TODO
export const support = () => {
  return true
}
