import { GET_PLAYERS_SUCCESS, SERCH_BY_FILTER, CLEAR_FILTERS, SET_FILTERS } from '../actions'

const initialState = {
    fetched: false,
    source: 'players',
    players: [],
    filters: [],
    filteredPlayer: null
}

export const parsedPlayer = (player) => {
    let age = new Date().getFullYear() - new Date(player.dateOfBirth).getFullYear();
    return {
        name: player.name,
        position: player.position,
        age: age,
    }
}

export const searchPlayer = (state, action, player) => {
    let isHere = false
    state.filters && state.filters.forEach((filter) => {
        isHere = player[filter].toString().search(action.filter) !== -1
    })
    if(isHere) {
        return player
    } else {
        return null
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_PLAYERS_SUCCESS:
            return {
                ...state, 
                fetched: true, 
                players: action.players.map( player => {
                    return parsedPlayer(player) 
                })
            }
        case SET_FILTERS:
            return {
                ...state, 
                filters: state.filters && state.filters.indexOf(action.search) === -1 ? state.filters.concat(action.search) : state.filters,
            }
        case SERCH_BY_FILTER:
            return {
                ...state, 
                source: 'filteredPlayer',
                filteredPlayer: state.players && state.players.filter(player => {
                    return searchPlayer(state, action, player)
                })
            }
        case CLEAR_FILTERS:
            return {
                ...state, 
                filteredPlayer: state.players,
                filters: []
            }
        default:
            return state
    }
}