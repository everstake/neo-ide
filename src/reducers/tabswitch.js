const groupLogReducer = (state = [], action) => {
    switch (action.type) {
        case 'TAB_SELECTED':
            return Object.assign({}, state, {


                tab: action.tab,

            });
        default:
            return state;
    }
};

export default groupLogReducer