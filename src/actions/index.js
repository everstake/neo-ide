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

export const changeFileCompiled = (name) => ({
    type: 'CHANGE_FILE_COMPILED',
    name: name,
});

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
    type: 'ADD_WALLET',
    address: address,
    coin_type: coin_type,
    amount: amount,
    network: network
});

export const addNeo = (neo) => ({
    type: 'ADD_NEO',
    neo: neo
});

export const tabSwitch = (tab) => ({
    type: 'TAB_SELECTED',
    tab: tab
});

export const renameFolder = (currentKey, newKey) => ({
    type: 'RENAME_FOLDER',
    currentKey: currentKey,
    newKey: newKey
});

export const renameFile = (currentKey, newKey) => ({
    type: 'RENAME_FILE',
    currentKey: currentKey,
    newKey: newKey
});
