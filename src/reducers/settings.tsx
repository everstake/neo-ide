import * as Config from "Config";

const defaultSettings = {...Config.settings, lang: Config.defaultLang};

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
