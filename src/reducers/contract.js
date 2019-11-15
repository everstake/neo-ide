const contractReducer = (state = [], action) => {
    switch (action.type) {
        case 'SELECT_CONTRACT':{


            if(!state.length) {
                
                return [
                    ...state,
                    {
                        contract: action.contract,
                    }
                ]
            }
            return state.map((file, i) => {
              
                if (file.contract !== action.contract) {
                  // Copy the object before mutating
                  return Object.assign({}, file, {
                    contract: action.contract,
                  });
                } 
                return file
              });
            
        }
        default:
            return state;
    }
};

export default contractReducer