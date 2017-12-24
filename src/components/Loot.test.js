import React from 'react'
import { mount, shallow } from 'enzyme'
import { Loot } from './Loot'

describe('Loot', () => {
    let loot;
    const mockFetchbitcoin = jest.fn()
    let props = { balance: 10, bitcoin: {} }

    beforeEach(() => {
        loot = shallow(<Loot {...props} />)
    })

    it('renders properly', () => {
        expect(loot).toMatchSnapshot()
    })

    describe('when mounted', () => {
        beforeEach(() => {
            props.fetchBitcoin = mockFetchbitcoin
            loot = mount(<Loot {...props} />)
        }) 

        it('dispatches the `fetchBitcoin()` method it receives from props', () => {
            expect(mockFetchbitcoin).toHaveBeenCalled()
        })
    })

    describe('when there are valid bitcoin props', () => {
        beforeEach(() => {
            props = { balance: 10, bitcoin: { bpi: {USD: { rate: '1,000' } } } }
            loot = shallow(<Loot {...props} />)
        })

        it('displays the correct bitcoin value', () => {
            expect(loot.find('h3').text()).toEqual('Bitcoin balance: 0.01')
        })
    })
})