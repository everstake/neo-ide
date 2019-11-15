export const addLog = (text, group) => ({
    type: 'ADD_LOG',
    text: text,
    group: group
});

export const addFile = (files, prefix) => ({
    type: 'ADD_FILE',
    files: files,
    prefix: prefix
});

export const enqueueSnackbar = (alert) => ({
  type: 'ENQUEUE_SNACKBAR',
  alert: {
    ...alert,
    key: (alert.options && alert.options.key) || new Date().getTime() + Math.random()
  }
});

export const closeSnackbar = key => ({
  type: 'CLOSE_SNACKBAR',
  dismissAll: !key, // dismiss all if no key has been defined
  key,
});

export const removeSnackbar = key => ({
    type: 'REMOVE_SNACKBAR',
    key,
});

export const addFolder = (folderKey) => ({
    type: 'ADD_FOLDER',
    folderKey: folderKey
});

export const deleteFolder = (folderKey) => ({
    type: 'DELETE_FOLDER',
    folderKey: folderKey
});

export const deleteFile = (fileKey) => ({
    type: 'DELETE_FILE',
    fileKey: fileKey
});

export const changeCurrentFile = (name) => ({
    type: 'CHANGE_CURRENT_FILE',
    name: name,
});

export const changeFileSaved = (name, newContent, autosave) => ({
    type: 'CHANGE_FILE_SAVED',
    name: name,
    newContent: newContent,
    autosave: autosave
});

export const changeFileCompiled = (name, binary) => ({
  type: 'CHANGE_FILE_COMPILED',
  name: name,
  binary: binary
})

export const changeFileDeployed = (name) => ({
    type: 'CHANGE_FILE_DEPLOYED',
    name: name,
});

export const saveFile = (name, fileObj) => ({
    type: 'SAVE_FILE',
    name: name,
    fileObj: fileObj
});

export const addUserWallet = (address, coin_type, amount, network) => ({
  type:'ADD_WALLET',
  address: address, 
  coin_type: coin_type,
  amount: amount,
  network: network
})

export const addNeo = (neo) => ({
    type: 'ADD_NEO',
    neo: neo
});

export const tabSwitch = (tab) => ({
    type: 'TAB_SELECTED',
    tab: tab
});

export const renameFolder = (currentKey, newKey, onError) => ({
  type: 'RENAME_FOLDER',
  currentKey: currentKey,
  onError: onError,
  newKey: newKey
})

export const renameFile = (currentKey, newKey) => ({
    type: 'RENAME_FILE',
    currentKey: currentKey,
    newKey: newKey
});

export const addParameter = (param_id, type_of_value, value) => ({
    type: 'ADD_PARAMETER',
    param_id: param_id,
    type_of_value: type_of_value,
    value: value,
});

export const changeParameterType = (param_id, type_of_value) => ({
    type: 'CHANGE_PARAMETER_TYPE',
    param_id: param_id,
    type_of_value: type_of_value,
});
export const changeParameterValue = (param_id, value) => ({
    type: 'CHANGE_PARAMETER_VALUE',
    param_id: param_id,
    value: value,
});

export const delParameter = (param_id) => ({
    type: 'DEL_PARAMETER',
    param_id: param_id,
});

export const changeSetting = (param, value) => ({
    type: 'SET_SETTINGS',
    param: param,
    value: value
})