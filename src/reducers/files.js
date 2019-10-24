import defaultFiles from '../default_files/default_files'
import { identifier } from '@babel/types';

function findFileId(name, state) {
  let id = -1;
  var i;
  for (i = 0; i < state.length; i++) {
    if (state[i].file === true  && state[i].key.slice(-name.length) === name) {
      state[i].saved = false;
      id = i;
      break ;          
    }
  }
  return id;
}

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
      case 'CHANGE_FILE_SAVED': {
        state[findFileId(action.name, state)].saved = false;
        return state;
      }
      case 'SAVE_FILE': {
        let id = findFileId(action.name, state);
        if (action.fileObj.content) {
          state[id].content = action.fileObj.content;
        }
        if (action.fileObj.compiled) {
          state[id].compiled = action.fileObj.compiled;
        }
        state[id].saved = true;
        return state;
      }
      default:
        return defaultFiles;
    }
  }
  
  export default filesReducer