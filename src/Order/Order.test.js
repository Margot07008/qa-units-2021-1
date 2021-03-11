jest.mock('../utils/getDate')
import React from 'react'
import {configure, shallow} from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import Order from "./Order";
import {getDate} from '../utils/getDate';
import {fakeOrders} from "../data/fakeOrders";
import toJson from "enzyme-to-json";


const fakeDate = 123;
configure({adapter: new Adapter()});


describe('Order.js', () => {

    beforeEach(() => {
        getDate.mockClear();
        getDate.mockReturnValue(fakeDate);
    });

    afterAll(() => {
        getDate.mockReset();
    });

    it('render empty', () => {
        const wrapper = shallow(<Order/>);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('render without params', () => {
        const wrapper = shallow(<Order order={{}}/>);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('render with data', () => {
        const wrapper = shallow(<Order order={{shop: "test1", date: 123}}/>);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('render with data and items', () => {
        const wrapper = shallow(<Order order={{shop: "test2", date: 123, items: ["item1", "item2"]}}/>);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('check call getDate', () => {
        shallow(<Order order={fakeOrders[0]}/>);
        expect(getDate).toHaveBeenCalled();
    });

});