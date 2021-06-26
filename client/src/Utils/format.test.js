import { commaNumber } from "./format";

it('renders a comma separated number', () => {
    expect(commaNumber(100500, false)).toEqual("100,500");
});

it('renders a comma separated number with decimals', () => {
    expect(commaNumber(100500, true)).toEqual("100,500.00");
});