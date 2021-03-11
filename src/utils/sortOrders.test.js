import React from 'react'
import {getSortFunction, sortByDate, sortByItemCount, sortOrders} from './sortOrders';
import {fakeOrders} from "../data/fakeOrders";

describe('sortOrders function', () => {
    it('call func', () => {
        const fakeSortFunc = jest.fn();
        sortOrders(fakeOrders, fakeSortFunc);
        expect(fakeSortFunc).toHaveBeenCalled();
    });

    it('without orders', () => {
        const fakeSortFunc = jest.fn();
        sortOrders(undefined, fakeSortFunc);
        expect(fakeSortFunc).not.toHaveBeenCalled()
    });

    it('without func', () => {
        const fakeSortFunc = jest.fn();
        sortOrders(fakeOrders, undefined);
        expect(fakeSortFunc).not.toHaveBeenCalled()
    });
});

describe('getSortFunction function', () => {
    it ('func type is count', () => {
        getSortFunction({COUNT: 'count'});
    })

    it ('func type is date', () => {
        getSortFunction({DATE: 'date'});
    })

    it('func has wrong type', () => {
        const type = 0;
        const result = getSortFunction(type);
        expect(result).toBe(undefined);
    });
})


describe('sortByItemCount function', () => {

    const cases = [
        [{items: ['item1', 'item2']}, {items: ['1', '2']}, 0],
        [{items: ['item1', 'item2']}, {items: ['1']}, 1],
        [{items: ['item1']}, {items: ['1', '2']}, -1],
        [{items: undefined}, {items: undefined}, 0],
        [undefined, undefined, 0],
        [null, null, 0]
    ];

    test.each(cases)('(%i, %i , %i)',(firstArg, secondArg, expectedResult) => {
        const result = sortByItemCount(firstArg, secondArg);
        expect(result).toBe(expectedResult);
    })
});


describe('sortByDate function', () => {

    const today = new Date(Date.now());
    const yesterday = new Date(Date.now() - 864e5);

    const cases = [
        [{date: [today]}, {date: [today]}, 0],
        [{date: [yesterday]}, {date: [today]}, -1],
        [{date: [today]}, {date: [yesterday]}, 1],
        [{date: undefined}, {date: undefined}, 0],
        [undefined, undefined, 0],
        [null, null, 0],
    ];

    test.each(cases)('(%i, %i , %i)',(firstArg, secondArg, expectedResult) => {
        const result = sortByDate(firstArg, secondArg);
        expect(result).toBe(expectedResult);
    })
});