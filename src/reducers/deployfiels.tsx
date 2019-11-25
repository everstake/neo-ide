
const deployfiledReducer = (state = [], action) => {

    switch (action.type) {
        case "ADD_DEPLOY_FIELD":  {
            return [
                ...state,
                {
                    contract: action.contract,
                    name: action.name,
                    version: action.version,
                    author: action.author,
                    email: action.email,
                    description: action.description,
                    needsStorage: action.needsStorage,
                    dynamicInvoke: action.dynamicInvoke,
                    isPayable: action.isPayable,
                    networkFee: action.networkFee,
                },
            ];
        }

        case "CHANGE_CONTRACT_FIELD": {

            return state.map((file, i) => {
                console.log(file.contract);
                console.log(action.contract);
                console.log(action.value);
                if (file.contract === action.contract) {
                // Copy the object before mutating
                    if(action.field_name === "name") {
                        return Object.assign({}, file, {
                            name: action.value,
                        });

                    }
                    if(action.field_name === "version") {
                        return Object.assign({}, file, {
                            version: action.value,
                        });
                    }
                    if(action.field_name === "author") {
                        return Object.assign({}, file, {
                            author: action.value,
                        });
                    }
                    if(action.field_name === "email") {
                        return Object.assign({}, file, {
                            email: action.value,
                        });
                    }
                    if(action.field_name === "description") {
                        return Object.assign({}, file, {
                            description: action.value,
                        });
                    }
                    if(action.field_name === "needsStorage") {
                        return Object.assign({}, file, {
                            needsStorage: action.value,
                        });
                    }
                    if(action.field_name === "dynamicInvoke") {
                        return Object.assign({}, file, {
                            dynamicInvoke: action.value,
                        });
                    }
                    if(action.field_name === "isPayable") {
                        return Object.assign({}, file, {
                            isPayable: action.value,
                        });
                    }
                    if(action.field_name === "networkFee") {
                        return Object.assign({}, file, {
                            networkFee: action.value,
                        });
                    }

                }
                return file;
            });
        }
        default:
            return state;
    }
};

export default deployfiledReducer;
