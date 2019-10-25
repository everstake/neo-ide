
export const addLog = (text, group) => ({
  type: 'ADD_LOG',
  text: text,
  group: group
})

export const changeFileSaved = (name, newContent) => ({
  type: 'CHANGE_FILE_SAVED',
  name: name,
  newContent: newContent
})

export const changeFileCompiled = (name) => ({
  type: 'CHANGE_FILE_COMPILED',
  name: name,
})

export const changeFileDeployed = (name) => ({
  type: 'CHANGE_FILE_DEPLOYED',
  name: name,
})

export const saveFile = (name, fileObj) => ({
  type: 'SAVE_FILE',
  name: name,
  fileObj: fileObj
})

export const addUserWallet = (address, coin_type, amount, network) => ({
  type:'ADD_WALLET',
  address: address, 
  coin_type: coin_type,
  amount: amount,
  network:network
})



export const addNeo = (neo) => ({
  type: 'ADD_NEO',
  neo: neo
})
