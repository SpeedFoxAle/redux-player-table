import { FETCH_DATA, SERCH_BY_FILTER } from '../actions';

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
            break;
        case SERCH_BY_FILTER:
            return {
                ...state, 
                players: state.players.filter(player => {
                    let isHere = player[action.search].toString().search(action.filter) !== -1
                    if(isHere) {
                        return player
                    }
                }) 
            }
            break;
        default:
            return state
    }
}