
export const addLog = (text, group) => ({
  type: 'ADD_LOG',
  text: text,
  group: group
})

export const changeFileSaved = (name) => ({
  type: 'CHANGE_FILE_SAVED',
  name: name
})

export const saveFile = (name, fileObj) => ({
  type: 'SAVE_FILE',
  fileObj: fileObj
})
