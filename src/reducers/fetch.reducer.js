
import { FETCH_DATA, NAME_FILTER, POSITION_FILTER, AGE_FILTER } from '../actions';

const initialState = {
    fetched: false,
    players: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DATA:
            return {
                ...state, 
                fetched: true, 
                players: action.players.map( player => {
                    let age = new Date().getFullYear() - new Date(player.dateOfBirth).getFullYear();
                    return {
                        name: player.name,
                        position: player.position,
                        age: age,
                        filtered: false
                    }
                })
            }
        case NAME_FILTER:
            return {
                ...state, 
                players: state.players.filter(player => { 
                    if(player.name === action.filter) {
                        return player
                    }
                }) 
            }
        case POSITION_FILTER:
            return {
                ...state, 
                players: state.players.filter(player => { 
                    if(player.position === action.filter) {
                        return player;
                    }
                }) 
            }
        case AGE_FILTER:
            return {
                ...state, 
                players: state.players.filter(player => { 
                    if(player.age.toString() === action.filter) {
                        return player;
                    }
                })
            }
        default:
            return state
    }
}