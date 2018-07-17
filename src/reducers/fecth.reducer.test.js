import reducer, {parsedPlayer, searchPlayer} from './fetch.reducer'
import { GET_PLAYERS_SUCCESS, SERCH_BY_FILTER, CLEAR_FILTERS, SET_FILTERS } from '../actions'
import playersMock from '../../mocks/players'
const initialState = {
    fetched: false,
    source: 'players',
    players: [],
    filters: [],
    filteredPlayer: null
}

describe('Test reducers', () => {
    it('Has a default state', () => {
        expect(reducer(undefined, { type: 'unexpected' })).toEqual(initialState);
    });

    it('Get players success', () => {
        expect(reducer(initialState, { type: GET_PLAYERS_SUCCESS, players: playersMock })).toEqual({
            filteredPlayer: null,
            filters: [],
            source: "players",
            fetched: true, 
            players: playersMock.map( player => {
                return parsedPlayer(player)
            })
        })
    });

    it('Search players by filter', () => {
        let state = {
            players: playersMock.map( player => {
                return parsedPlayer(player)
            }),
            filters: []
        }
        expect(reducer(state, {type: SERCH_BY_FILTER, filters: ['name'], search: 'Marcus Rashford' })).toMatchObject({
            filteredPlayer: playersMock.filter( player => {
                return searchPlayer(player)
            })
        })
    });

    it('Found players not found', () => {
        let state = {
            players: playersMock.map( player => {
                return parsedPlayer(player)
            })
        }
        expect(reducer(state, {type: SERCH_BY_FILTER, filters: ['age'], search: '500' }).filteredPlayer.length).toEqual(0)
    });
    
    it('Set name filter', () => {
        expect(reducer(initialState, { type: SET_FILTERS, search: 'name' })).toMatchObject({
            filters: ['name'],
        })
    });

    it('Set age filter', () => {
        expect(reducer(initialState, { type: SET_FILTERS, search: 'age' })).toMatchObject({
            filters: ['age']
        })
    });

    it('Clean filters', () => {
        expect(reducer(initialState, { type: CLEAR_FILTERS})).toMatchObject({
            filters: []
        })
    });
})