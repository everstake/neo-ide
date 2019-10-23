
const currentFileReducer = (state = [], action) => {
    switch (action.type) {
      case 'CHANGE_CURRENT_FILE': {
        return action.file
      }
      default:
        return 'domain.cs';
    }
  }
  
  export default currentFileReducer