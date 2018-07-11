export const FETCH_DATA = 'FETCH_DATA';
export const NAME_FILTER = 'NAME_FILTER';
export const POSITION_FILTER = 'POSITION_FILTER';
export const AGE_FILTER = 'AGE_FILTER';

export const setNameFilter = (filter) => {
    return (dispatch) => {
        dispatch({type: NAME_FILTER, filter: filter });
    }
}

export const setAgeFilter = (filter) => {
    return (dispatch) => {
        dispatch({type: AGE_FILTER, filter: filter });
    }
}

export const setPositionFilter = (filter) => {
    return (dispatch) => {
        dispatch({type: POSITION_FILTER, filter: filter });
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
