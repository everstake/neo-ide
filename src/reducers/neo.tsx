const neoReducer = (state = {neo: false,address: false, coin_type: false,amount: false,network: false}, action) => {

    switch (action.type) {
        case "CHANGE_NEO_FIELD": {
            if(action.field_name === "neo") {
                return Object.assign({}, state, {
                    neo: action.value,
                });
            }
            if(action.field_name === "address") {
                return Object.assign({}, state, {
                    address: action.value,
                });
            }
            if(action.field_name === "network") {
                return Object.assign({}, state, {
                    network: action.value,
                });
            }
            if(action.field_name === "coin_type") {
                return Object.assign({}, state, {
                    coin_type: action.value,
                });
            }
            if(action.field_name === "amount") {
                return Object.assign({}, state, {
                    amount: action.value,
                });
            }


            return state;
        }

        default:
            return state;
    }
};

export default neoReducer;
