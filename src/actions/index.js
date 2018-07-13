export const FETCH_DATA = 'FETCH_DATA'
export const SERCH_BY_FILTER = 'SERCH_BY_FILTER'
export const CLEAR_FILTERS = 'CLEAR_FILTERS'
export const SET_FILTERS = 'SET_FILTERS'
export const DOMMY = 'DOMMY'

export const dummyAction = () => {
    return {
        value: 1,
        type: DOMMY
    }
}
export const searchByFilter = (filter, search) => {
    return (dispatch) => {
        dispatch({type: SET_FILTERS, search: search })
        dispatch({type: SERCH_BY_FILTER, filter: filter, search: search })
    }
}

export const clearFilter = (filter, search) => {
    return (dispatch) => {
        dispatch({type: CLEAR_FILTERS})
    }
}

export const getAllData = () => {
    return (dispatch) => {
        fetch('https://football-players-b31f2.firebaseio.com/players.json?print=pretty')
            .then(response => response.json())
            .then(players => {
                dispatch({
                    type: FETCH_DATA,  
                    players: players
                });
            })
    }
}
