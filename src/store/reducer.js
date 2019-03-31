import * as actionTypes from './actionTypes';

const initialState = {
    search: [],
    isSearchMode: false
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_SEARCH_RESULT:
            return {
                ...state,
                search: action.search
                }
        
        case actionTypes.SET_SEARCH_MODE:
            console.log('set to search mode');
            return {
                ...state,
                isSearchMode: true
            }
    
        case actionTypes.REMOVE_SEARCH_MODE:
            console.log('remove from search mode');
            return {
                ...state,
                isSearchMode: false
            }
        
        default:
            return state;
    }
}

export default reducer;