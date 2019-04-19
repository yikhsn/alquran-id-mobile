import * as actionTypes from '../actionTypes';

const initialState = {
    ayats: [],
    suratList: [],
    search: [],
    wordsSearch: '',
    wordsSearched: '',
    selectedAyat: null,
    isSearchMode: false,
    goToSuratVisible: false,
    goToAyatVisible: false
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

        case actionTypes.SET_WORDS_SEARCHED:
            return {
                ...state,
                wordsSearched: state.wordsSearch
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

        case  actionTypes.TOGGLE_GO_TO_SURAT_MODAL:
            return {
                ...state,
                goToSuratVisible: !state.goToSuratVisible
            }

        case  actionTypes.TOGGLE_GO_TO_AYAT_MODAL:
            return {
                ...state,
                goToAyatVisible: !state.goToAyatVisible
            }

        case actionTypes.SELECT_AYAT:
            return {
                ...state,
                selectedAyat: action.selectedAyat
            }

        case actionTypes.SET_AYAT:
            return {
                ...state,
                ayats: action.ayats
            }
        
        
        default:
            return state;
    }
}

export default reducer;