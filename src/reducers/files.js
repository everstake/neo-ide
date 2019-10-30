import Moment from 'moment'

const filesReducer = (state = [], action) => {
    switch (action.type) {
      case 'ADD_FILE': {
        const newFiles = action.files.map((file) => {
          let newKey = action.prefix
          if (action.prefix !== '' && action.prefix.substring(action.prefix.length - 1, action.prefix.length) !== '/') {
            newKey += '/'
          }
          file.key = newKey + file.key
          file.lang = 'python'
          file.modified = +Moment()
          return {
            ...file,
          }
        })
        
        // let newState = [...state, ...newFiles];
        // const uniqueNewFiles = []
        // newState.map((newFile) => {
        //   let exists = false
        //   newState.map((existingFile) => {
        //     if (existingFile.key === newFile.key) {
        //       exists = true
        //     }
        //   })
        //   if (!exists) {
        //     uniqueNewFiles.push(newFile)
        //   }
        // })

        return [
          ...state,
          ...newFiles
          // ...uniqueNewFiles
        ]
      }
      case 'ADD_FOLDER': {
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