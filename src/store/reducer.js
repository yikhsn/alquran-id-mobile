import * as actionTypes from './actionTypes';

const initialState = {
    suratList: [],
    search: [],
    wordsSearch: '',
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
            return {
                ...state,
                isSearchMode: true
            }
    
        case actionTypes.REMOVE_SEARCH_MODE:
            return {
                ...state,
                isSearchMode: false
            }

        case actionTypes.SET_WORDS_SEARCH:
            return {
                ...state,
                wordsSearch: action.wordsSearch
            }

        case actionTypes.SET_SURAT_LIST:
            return {
                ...state,
                suratList: action.suratList
            }

        case actionTypes.REVERSE_SURAT_LIST:
            const reversed = [...state.suratList].reverse();
            return {
                ...state,
                suratList: reversed
            }
        
        default:
            return state;
    }
}

export default reducer;