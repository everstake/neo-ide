const methodsReducer = (state = [], action) => {
    switch (action.type) {
        case "SELECT_METHODS":  {


            if(!state.length) {

                return [
                    ...state,
                    {
                        methods: action.methods,
                    },
                ];
            }
            return state.map((file, i) => {

                if (file.methods !== action.methods) {
                    // Copy the object before mutating
                    return Object.assign({}, file, {
                        methods: action.methods,
                    });
                }
                return file;
            });
        }
        default:
            return state;
    }
};

export default methodsReducer;
