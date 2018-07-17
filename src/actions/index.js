
import axios from 'axios'
export const GET_PLAYERS_SUCCESS = 'GET_PLAYERS_SUCCESS'
export const GET_PLAYERS_FAIL = 'GET_PLAYERS_FAIL'
export const SERCH_BY_FILTER = 'SERCH_BY_FILTER'
export const CLEAR_FILTERS = 'CLEAR_FILTERS'
export const SET_FILTERS = 'SET_FILTERS'
const url = 'https://football-players-b31f2.firebaseio.com/players.json?print=pretty'

const getPlayersSuccess = players => ({
    type: GET_PLAYERS_SUCCESS,
    players,
});
  
const getPlayersFail = error => ({
    type: GET_PLAYERS_FAIL,
    error,
});

export const getAllData = (testUrl) => (dispatch) => {
    return axios({url: testUrl ? testUrl : url, method: 'get'})
        .then(response => {
            dispatch(getPlayersSuccess(response.data));
            return response;
        })
        .catch(error => {
            let errorResponse = error && error.response
            dispatch(getPlayersFail(errorResponse.data));
            return error;
        });
};

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