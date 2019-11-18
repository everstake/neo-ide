const getIndex = (val) => {
    switch (val) {
        case "Compiler":
            return 0;
        case "Deploy":
            return 1;
        case "Debug":
            return 2;
        default:
            return 0;
    }
}

const groupLogReducer = (state = {tab: 'Compiler', index: 0}, action) => {
    switch (action.type) {
        case 'TAB_SELECTED':
            
            return Object.assign({}, state, {
                tab: action.tab,
                index: getIndex(action.tab)
            });
        default:
            return state;
    }
};

export default groupLogReducer