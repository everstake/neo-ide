const walletReducer = (state = [], action) => {
    switch (action.type) {
      case 'ADD_WALLET': {

        return [
          ...state,
    
            {
             address: action.address, 
             coin_type: action.coin_type,
             amount: action.amount,
             network:action.network
            }
        ]
      }
      default:
        return state;
    }
  }
  
  export default walletReducer