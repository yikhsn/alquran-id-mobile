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