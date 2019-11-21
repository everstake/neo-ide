import Moment from 'moment'
import notify from '../utils/notificator.js';
import * as Config from 'Config';

const getFileLangByName = (fileName) => {
  let lang = Config.editor.defaultLang
  let fileExtension = (fileName.replace(/^.*[\\\/]/, '')).split('.')[1]

  if (fileExtension === 'py') {
    lang = 'python'
  } else if (fileExtension === 'cs') {
    lang = 'csharp'
  }
  return lang
}

const filesReducer = (state = [], action) => {
    switch (action.type) {
      case 'ADD_FILE': {
        const newFiles = [];
        action.files.map((file) => {
          let newKey = action.prefix
          if (action.prefix !== '' && action.prefix.substring(action.prefix.length - 1, action.prefix.length) !== '/') {
            newKey += '/'
          }
          file.key = newKey + file.key
          file.lang = getFileLangByName(file.key)
          file.modified = +Moment()
          file.size = 0 //todo
          file.file = true
          file.saved = true
          file.compiled = false
          file.deployed = false
          file.savedContent = file.savedContent || ""
          file.currentContent = file.savedContent || ""
          file.binary = ""
          file.tx_id = ""

          for (let i = 0; i < state.length; i++) {
            if (state[i].key === file.key){
              let alertKey = new Date().getTime() + Math.random()
              let alert = notify(
                "File with \"" + file.key +"\" name already exist",
                'error',
                'File browser',
                () => action.asyncDispatch({type: 'CLOSE_SNACKBAR', key: alertKey})
              )
              action.asyncDispatch({type: 'ENQUEUE_SNACKBAR', key: alertKey, alert: alert})  
              return ;
            }
          }
          newFiles.push({
            ...file
          })
        })
        return [
          ...state,
          ...newFiles
        ]
      }
      case 'ADD_FOLDER': {
        for (let i = 0; i < state.length; i++) {
          if (state[i].key === action.folderKey){
            let alertKey = new Date().getTime() + Math.random()
            let alert = notify(
              "Folder with \"" + action.folderKey +"\" name already exist",
              'error',
              'File browser',
              () => action.asyncDispatch({type: 'CLOSE_SNACKBAR', key: alertKey})
            )
            action.asyncDispatch({type: 'ENQUEUE_SNACKBAR', key: alertKey, alert: alert})
            return state;
          }
        }
        return [
          ...state,
          {key: action.folderKey}
        ]
      }
      case 'DELETE_FOLDER': {
        let newFiles = []

        state.map(el => {
          if (!(el.key.substr(0, action.folderKey.length) === action.folderKey)) {
            newFiles.push(el)
          }
        })
        action.asyncDispatch({type: 'SET_CURRENT_FILE_IF_ANY', files: newFiles})
        return newFiles
      }
      case 'DELETE_FILE': {
        const index = state.findIndex((val) => val.key === action.fileKey);
        if (index !== -1) {
          state.splice(index, 1);
          action.asyncDispatch({type: 'SET_CURRENT_FILE_IF_ANY', files: state})
        }
        return [...state]
      }
      case 'CHANGE_FILE_SAVED': {
        return state.map((fileObj, i) => {
          if (fileObj.file === true  && fileObj.key.slice(-action.name.length) === action.name) {
            // Copy the object before mutating
            return Object.assign({}, fileObj, {
              saved: action.autosave,
              compiled: false,
              deployed: false,
              currentContent: action.newContent,
              savedContent: (action.autosave && action.newContent) || fileObj.savedContent
            });
          }
          return fileObj
        });
      }
      case 'CHANGE_FILE_COMPILED': {
        console.log(action.name)
        return state.map((fileObj, i) => {
          if (fileObj.file === true  && fileObj.key.slice(-action.name.length) === action.name) {
            // Copy the object before mutating
            return Object.assign({}, fileObj, {
              compiled: true,
              binary: action.binary,
              methods: action.methods,
            });
          }
          return fileObj
        });
      }
      case 'CHANGE_FILE_DEPLOYED': {
        return state.map((fileObj, i) => {
          if (fileObj.file === true  && fileObj.key.slice(-action.name.length) === action.name) {
            // Copy the object before mutating
            return Object.assign({}, fileObj, {
              deployed: true,
              tx_id: action.tx_id,
            });
          }
          return fileObj
        });
      }
      case 'SAVE_FILE': {
        return state.map((fileObj, i) => {
          if (fileObj.file === true  && fileObj.key.slice(-action.name.length) === action.name) {
            // Copy the object before mutating
            return Object.assign({}, fileObj, {
              saved: true,
              compiled: false,
              deployed: false,
              savedContent: action.fileObj.currentContent,
              currentContent: action.fileObj.currentContent,
            });
          }
          return fileObj
        });
      }
      case 'RENAME_FOLDER': {
        for (let i = 0; i < state.length; i++) {
          if (state[i].key === action.newKey){
            let alertKey = new Date().getTime() + Math.random()
            let alert = notify(
              "Folder with \"" + action.newKey +"\" name already exist",
              'error',
              'File browser',
              () => action.asyncDispatch({type: 'CLOSE_SNACKBAR', key: alertKey})
            )
            action.asyncDispatch({type: 'ENQUEUE_SNACKBAR', key: alertKey, alert: alert})
            return state;
          }
        }
        return state.map((file, i) => {
          if (file.key.substr(0, action.currentKey.length) === action.currentKey) {
            // Copy the object before mutating
            return Object.assign({}, file, {
              key: file.key.replace(action.currentKey, action.newKey),
            });
          }
          return file
        });
      }
      case 'RENAME_FILE': {
        for (let i = 0; i < state.length; i++) {
          if (state[i].key === action.newKey){
            let alertKey = new Date().getTime() + Math.random()
            let alert = notify(
              "File with \"" + action.newKey +"\" name already exist",
              'error',
              'File browser',
              () => action.asyncDispatch({type: 'CLOSE_SNACKBAR', key: alertKey})
            )
            action.asyncDispatch({type: 'ENQUEUE_SNACKBAR', key: alertKey, alert: alert})
            return state;
          }
        }
        let newFileLang = getFileLangByName(action.newKey)
        return state.map((file, i) => {
          if (file.key === action.currentKey) {
            // Copy the object before mutating
            return Object.assign({}, file, {
              key: action.newKey,
              lang: newFileLang
            });
          }
          return file
        });
      }
      default:
        return state;
    }
  }
  
  export default filesReducer
