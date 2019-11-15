
const deployfiledReducer = (state = [], action) => {
    
    switch (action.type) {
        case 'ADD_DEPLOY_FIELD':{
            return [
                ...state,
                {
                    
                  contract: action.contract,
                  name: action.name,
                  version: action.version,
                  email: action.email,
                }
            ]
        }
        default:
          return state;
      }
};

export default deployfiledReducer

