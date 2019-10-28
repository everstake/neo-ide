const filesReducer = (state = [], action) => {
    switch (action.type) {
      case 'ADD_FILE': {
        action.file.lang = action.lang
        return [
          ...state,
          action.file
        ]
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
      default:
        return state;
    }
  }
  
  export default filesReducer