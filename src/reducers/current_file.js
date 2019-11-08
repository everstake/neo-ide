const currentFileReducer = (state = "", action) => {

    switch (action.type) {
        case 'CHANGE_CURRENT_FILE': {
            return action.name;
        }
        default:
            return state;
    }
};

export default currentFileReducer