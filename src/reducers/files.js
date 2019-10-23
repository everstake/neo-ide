import defaultFiles from '../default_files/default_files'

const filesReducer = (state = [], action) => {
    switch (action.type) {
      case 'ADD_FILE': {
        return [
          ...state,
          {
            key: action.key,
            modified: 0,
            size: 0,
          }
        ]
      }
      default:
        return defaultFiles;
    }
  }
  
  export default filesReducer