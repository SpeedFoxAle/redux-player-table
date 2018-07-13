import reducer from './fetch.reducer'
import * as actions from '../actions'

it('should get initial state', () => {
    expect(reducer({}, {})).toEqual({});
});