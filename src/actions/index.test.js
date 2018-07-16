import * as actionsList from './index'

describe('Test actions', () => {
    it('Should be work', () => {
        const value = 1
        const expectedAction = {
            value,
            type: actionsList.DOMMY
        }
        expect(actionsList.dummyAction(value)).toEqual(expectedAction)
    })
})