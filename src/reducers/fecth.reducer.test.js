import reducer from './fetch.reducer'

describe('Test reducers', () => {
    it('should get initial state', () => {
        expect(reducer({}, {})).toEqual({});
    });
})