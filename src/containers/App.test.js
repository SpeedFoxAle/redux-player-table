 import Enzyme from 'enzyme'
 import Adapter from 'enzyme-adapter-react-16';
 import assert from 'assert'
import React from 'react'
import App from './App'

Enzyme.configure({ adapter: new Adapter() });

describe('App.js', () => {
    it('renders', () => {

        const wrapper = Enzyme.shallow(<App />)
        assert(wrapper.length, 'rendered')
    })
})