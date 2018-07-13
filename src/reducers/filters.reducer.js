import { SERCH_BY_FILTER, CLEAR_FILTERS, SET_FILTERS } from '../actions'

const initialState = {
    source: 'players',
    filters: [],
    filteredPlayer: null
}

export default (state = initialState, action) => {
    switch (action.type) {
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
                    let isHere = false
                    state.filters.forEach((filter) => {
                        isHere = player[filter].toString().search(action.filter) !== -1
                    })
                    if(isHere) {
                        return player
                    } else {
                        return null
                    }
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