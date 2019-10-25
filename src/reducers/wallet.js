

const walletReducer = (state =  {address:'', coin_type:'', amount:0, network:'' }, action) => {

  switch (action.type) {
      case 'ADD_WALLET': 
        
        return Object.assign({}, state,  {
      
             address: action.address, 
             coin_type: action.coin_type,
             amount: action.amount,
             network:action.network
            
          })

      default:
        return state;
    }
  }
  
  export default walletReducer

