import * as actionTypes from '../actionTypes';

const initialState = {
    darkMode: false,
}

const themeReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.CHANGE_THEME:
            return {
                ...state,
                darkMode: action.darkMode
            }

        default:
            return state;
    }
}

export default themeReducer;