
const groupLogReducer = (state = {tab: 0}, action) => {
    switch (action.type) {
        case "TAB_SELECTED":

            return Object.assign({}, state, {
                tab: action.tab,
            });
        default:
            return state;
    }
};

export default groupLogReducer;
