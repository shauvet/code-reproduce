window.bjfn || (window.bjfn = {})
let { bjfn } = window

export function getGlobalData (key) {
  return bjfn[key]
}

export function setGlobalData (data) {
  bjfn = Object.assign(bjfn, data)
}


export function getLocalData (key) {
  return JSON.parse(localStorage.getItem(key))
}

export function setLocalData (key, value) {
  localStorage.setItem(key, value ? JSON.stringify(value): null)
}

