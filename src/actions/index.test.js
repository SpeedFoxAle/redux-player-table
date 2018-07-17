import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import moxios from 'moxios'
import * as actions  from './index'
import playersMock from '../../mocks/players'
import errorMock from '../../mocks/error'
const badUrl = 'https://badUrl-football-players-b31f2.firebaseio.com/players.json?print=pretty'
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Test actions', () => {
    beforeEach(function () {
        moxios.install()
    });
    
    afterEach(function () {
        moxios.uninstall()
    });

    it('Get Players with Successed', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent()
            request.respondWith({
                status: 200,
                response: playersMock,
            });
        });

        const expectedActions = [
            { type: actions.GET_PLAYERS_SUCCESS, players: playersMock }
        ];
    
        const store = mockStore({ players: [] })
    
        return store.dispatch(actions.getAllData()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('Get Players with Failed', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent()
            request.respondWith({
                status: 404,
                response: errorMock,
            });
        });

        const expectedActions = [
            { type: actions.GET_PLAYERS_FAIL, error: errorMock }
        ];
    
        const store = mockStore({ players: [] })
    
        return store.dispatch(actions.getAllData(badUrl)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
})