const walletReducer = (state = {
    address: 'AJVH7X6iLytXNp5Y9jQez48YBEpDzfRZCV',
    coin_type: 'Loading...',
    amount: 'Loading...',
    network: 'Loading...'
}, action) => {

    switch (action.type) {
        case 'ADD_WALLET':

            return Object.assign({}, state, {

                address: action.address,
                coin_type: action.coin_type,
                amount: action.amount,
                network: action.network

            });

        default:
            return state;
    }
};

export default walletReducer

