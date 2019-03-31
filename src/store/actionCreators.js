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