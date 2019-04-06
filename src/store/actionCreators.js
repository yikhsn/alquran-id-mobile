import * as actionTypes from './actionTypes';

export const setSearchResult = search => {
    return {
        type: actionTypes.SET_SEARCH_RESULT,
        search: search
    }
}

export const setSearchMode = () => {
    return {
        type: actionTypes.SET_SEARCH_MODE,
    }
}

export const removeSearchMode = () => {
    return {
        type: actionTypes.REMOVE_SEARCH_MODE,
    }
}

export const setWordsSearch = (wordsSearch) => {
    return {
        type: actionTypes.SET_WORDS_SEARCH,
        wordsSearch: wordsSearch
    }
}

export const setWordsSearched = () => {
    return {
        type: actionTypes.SET_WORDS_SEARCHED,
    }
}

export const setSuratList = (suratList) => {
    return{
        type: actionTypes.SET_SURAT_LIST,
        suratList: suratList
    }
}

export const reverseSuratList = () => {    
    return {
        type: actionTypes.REVERSE_SURAT_LIST
    }
}

export const toggleGoToSuratModal = () => {
    return {
        type: actionTypes.TOGGLE_GO_TO_SURAT_MODAL
    }
}

export const toggleGoToAyatModal = () => {
    return {
        type: actionTypes.TOGGLE_GO_TO_AYAT_MODAL
    }
}

export const selectAyat = (selectedAyat) => {
    return {
        type: actionTypes.SELECT_AYAT,
        selectedAyat: selectedAyat
    }
}