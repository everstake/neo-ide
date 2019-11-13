let parametrID = 0;


const parameterReducer = (state = [], action) => {
    
    switch (action.type) {
        case 'ADD_PARAMETER':{
          parametrID++
            return [
                ...state,
                {
                    param_id: parametrID,
                    type_of_value: action.type_of_value,
                    value: action.value,
                    file_compiled: action.file_compiled,
                }
            ]
            // case 'DEL_PARAMETER':

            // return Object.assign({}, state, {

            //     address: action.address,
            //     coin_type: action.coin_type,
            //     amount: action.amount,
            //     network: action.network

            // });
        }
        case 'CHANGE_PARAMETER_TYPE': {
            
            return state.map((file, i) => {
              
                if (file.param_id === action.param_id) {
                  // Copy the object before mutating
                  return Object.assign({}, file, {
                    type_of_value: action.type_of_value,
                  });
                } 
                return file
              });
            


        }
        case 'CHANGE_PARAMETER_VALUE': {
            return state.map((file, i) => {
              
                if (file.param_id === action.param_id) {
                  // Copy the object before mutating
                  return Object.assign({}, file, {
                    value: action.value,
                  });
                } 
                return file
              });
        }
        case 'DEL_PARAMETER': {
           
        
         
        return state.filter((todo, index) => action.param_id !== index)
        }

        default:
            return state;
    }
};

export default parameterReducer

