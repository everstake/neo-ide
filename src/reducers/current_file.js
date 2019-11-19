const currentFileReducer = (state = "", action) => {
    switch (action.type) {
        case 'CHANGE_CURRENT_FILE': {
            return action.name;
        }
        case 'SET_CURRENT_FILE_IF_ANY': {
          // does current file exist
          action.files.forEach(el => {
              console.log(el.key.replace(/^.*[\\\/]/, ''), state)
          })
          if (action.files.findIndex((val) => (state === val.key.replace(/^.*[\\\/]/, ''))) === -1) {
            // set other file as current
            let fileID = action.files.findIndex((val) => val.file === true)
            let name = ""
            if (fileID !== -1) {
                name = action.files[fileID].key
            }
            return name;
          }
          return state
        }
        default:
            return state;
    }
};

export default currentFileReducer