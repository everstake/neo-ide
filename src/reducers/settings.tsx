import * as Config from "Config";

const defaultSettings = Config.settings

const settings = (state = defaultSettings, action) => {
    switch (action.type) {
        case "SET_SETTINGS": {
            state[action.param] = action.value;
            return { ...state };
        }
        default:
            return state;
    }
};

export default settings;
