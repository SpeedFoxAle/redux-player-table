import * as actionsList from './index'

describe('test actions', () => {
    it('Should be work', () => {
        const selectedValue = 1
        const expectedAction = {
            selectedValue,
            type: actionsList.CLEAR_FILTERS
        }
        expect(actionsList.dummyAction(selectedValue)).toEqual(expectedAction)
    })
})