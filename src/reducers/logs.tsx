let logId = 0;

function getTime() {
    const timestamp = Date.now();

    return new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        // dayPeriod: "",
    }).format(timestamp).slice(0, -3);
}

const getGroupId = (group) => {
    switch (group) {
        case "Compiler":
            return 0;
        case "Deploy":
            return 1;
        case "Debug":
            return 2;
        case "Invoke":
            return 3;
        default:
            return 0;
    }
};

const loggerReducer = (state = [], action) => {
    switch (action.type) {
        case "ADD_LOG": {
            logId++;

            // switch logger tab
            action.asyncDispatch({type: "TAB_SELECTED", tab: getGroupId(action.group)});

            return [
                ...state,
                {
                    id: logId,
                    group: action.group,
                    date: getTime(),
                    text: action.text,
                },
            ];
        }
        default:
            return state;
    }
};

export default loggerReducer;
