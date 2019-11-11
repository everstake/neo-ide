import Moment from 'moment'
import React from "react"
import Button from '@material-ui/core/Button'

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
          file.lang = 'python' // todo
          file.modified = +Moment()
          file.size = 0 //todo
          file.file = true
          file.saved = true
          file.compiled = false
          file.deployed = false
          file.savedContent = file.savedContent || ""
          file.currentContent = file.savedContent || ""
          file.binary = ""

          for (let i = 0; i < state.length; i++) {
            if (state[i].key === file.key){
              let alertKey = new Date().getTime() + Math.random()
              let errorAlert = {
                message: "File with \"" + file.key +"\" name already exist",
                options: {
                  variant: 'error',
                  group: 'File browser',
                  action: alertKey => (
                    <Button onClick={() => {action.asyncDispatch({type: 'CLOSE_SNACKBAR', key: alertKey})}}>close</Button>
                  )
                }
              }
              action.asyncDispatch({type: 'ENQUEUE_SNACKBAR', key: alertKey, alert: errorAlert})  
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
            let errorAlert = {
              message: "Folder with \"" + action.folderKey +"\" name already exist",
              options: {
                variant: 'error',
                group: 'File browser',
                action: alertKey => (
                  <Button onClick={() => {action.asyncDispatch({type: 'CLOSE_SNACKBAR', key: alertKey})}}>close</Button>
                )
              }
            }
            action.asyncDispatch({type: 'ENQUEUE_SNACKBAR', key: alertKey, alert: errorAlert})
            return state;
          }
        }
        return [
          ...state,
          {key: action.folderKey}
        ]
      }
      case 'DELETE_FOLDER': {
        
        const index = state.findIndex((val) => (val.key.substr(0, action.folderKey.length) === action.folderKey));
        if (index !== -1) {
          state.splice(index, 1);
        }
        return [...state]
      }
      case 'DELETE_FILE': {
        const index = state.findIndex((val) => val.key === action.fileKey);
        if (index !== -1) {
          state.splice(index, 1);
        }
        return [...state]
      }
      case 'CHANGE_FILE_SAVED': {
        return state.map((fileObj, i) => {
          if (fileObj.file === true  && fileObj.key.slice(-action.name.length) === action.name) {
            // Copy the object before mutating
            return Object.assign({}, fileObj, {
              saved: false,
              compiled: false,
              deployed: false,
              currentContent: action.newContent
            });
          }
          return fileObj
        });
      }
      case 'CHANGE_FILE_COMPILED': {
        return state.map((fileObj, i) => {
          if (fileObj.file === true  && fileObj.key.slice(-action.name.length) === action.name) {
            // Copy the object before mutating
            return Object.assign({}, fileObj, {
              compiled: true,
              binary: action.binary
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
              binary: action.binary
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
            let errorAlert = {
              message: "Folder with \"" + action.newKey +"\" name already exist",
              options: {
                variant: 'error',
                group: 'File browser',
                action: alertKey => (
                  <Button onClick={() => {action.asyncDispatch({type: 'CLOSE_SNACKBAR', key: alertKey})}}>close</Button>
                )
              }
            }
            action.asyncDispatch({type: 'ENQUEUE_SNACKBAR', key: alertKey, alert: errorAlert})
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
            let errorAlert = {
              message: "File with \"" + action.newKey +"\" name already exist",
              options: {
                variant: 'error',
                group: 'File browser',
                action: alertKey => (
                  <Button onClick={() => {action.asyncDispatch({type: 'CLOSE_SNACKBAR', key: alertKey})}}>close</Button>
                )
              }
            }
            action.asyncDispatch({type: 'ENQUEUE_SNACKBAR', key: alertKey, alert: errorAlert})
            return state;
          }
        }
        return state.map((file, i) => {
          if (file.key === action.currentKey) {
            // Copy the object before mutating
            return Object.assign({}, file, {
              key: action.newKey,
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
