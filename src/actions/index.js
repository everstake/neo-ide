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

export const changeFileSaved = (name, newContent) => ({
    type: 'CHANGE_FILE_SAVED',
    name: name,
    newContent: newContent
});

export const changeFileCompiled = (name, binary, methods) => ({
  type: 'CHANGE_FILE_COMPILED',
  name: name,
  binary: binary,
  methods: methods,
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


export const addParameter = (param_id, type_of_value, value, file_compiled, param) => ({
    type: 'ADD_PARAMETER',
    param_id: param_id,
    type_of_value: type_of_value,
    value: value,
    file_compiled: file_compiled,
    param: param
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


export const selectCompiledContract = (contract) => ({
    type: 'SELECT_CONTRACT',
    contract: contract,
})

export const selectContractMethods = (methods) => ({
    type: 'SELECT_METHODS',
    methods: methods,
})

export const addeployField = (contract, name, version, author, email, description, needsStorage, dynamicInvoke, isPayable) => ({
    type: 'ADD_DEPLOY_FIELD',
    contract: contract,
    name: name,
    version: version,
    author: author,
    email: email,
    description: description,
    needsStorage: needsStorage,
    dynamicInvoke: dynamicInvoke,
    isPayable: isPayable,

})

export const changeNameField = (contract, field_name, value) => ({
    type: 'CHANGE_CONTRACT_FIELD',
    contract: contract,
    field_name: field_name,
    value: value,

})
