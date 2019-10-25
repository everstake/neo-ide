



const neoReducer = (state =  {}, action) => {

    switch (action.type) {
        case 'ADD_NEO': 
        return Object.assign({}, state,  {
            
          
          neo: action.neo,
         
        })
        default:
          return state;
      }
    }
    
    export default neoReducer
  
  