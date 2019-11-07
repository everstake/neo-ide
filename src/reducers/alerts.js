import { object } from "prop-types";

const defaultState = [];

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'ENQUEUE_SNACKBAR':
            return [
                ...state,
                {
                    key: action.key,
                    ...action.alert
                }
            ];
        case 'CLOSE_SNACKBAR':
            return state.map(alertObj => {
                if (action.dismissAll || alertObj.key === action.key)
                    return Object.assign({}, alertObj, {
                        dismissed: true
                    })
                return alertObj
            })
        case 'REMOVE_SNACKBAR':
            return [
                ...state.filter(
                    alert => alert.key !== action.key,
                ),
            ];

        default:
            return state;
    }
};
