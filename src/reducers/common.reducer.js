import { LOADER_TOGGLE_ACTION } from "../actions/common.action";

const initialState = {
    showLoader: false
}

const commonReducer = (state = initialState, action) => {
    let { type, payload } = action;

    switch (type) {
        case LOADER_TOGGLE_ACTION:
            return {
                ...state,
                showLoader: payload
            }
        default:
            return state;
    }
}

export default commonReducer;
