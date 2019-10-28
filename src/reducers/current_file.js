
const currentFileReducer = (state = "", action) => {
    console.log("Action.name: ", action.name)
    switch (action.type) {
      case 'CHANGE_CURRENT_FILE': {
        return action.name;
      }
      default:
        return state;
    }
  }
  
  export default currentFileReducer