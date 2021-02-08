const dateToIntTrasnformer = require('./DateToIntTransformer');

describe('Date do int transformer', () => {
    it('Should parse date to milliseconds', () => {
        const expectedMillis = 2342342345;
        const date = new Date(expectedMillis);

        expect(dateToIntTrasnformer.to(date)).toBe(expectedMillis);
    });

    it('Should parse milliseconds to date', () => {
        const milliseconds = 2342342345;
        const date = new Date(milliseconds);

        expect(dateToIntTrasnformer.from(milliseconds)).toEqual(date);
    });

    it('Should return null if the entry of any method is null', () => {
        expect(dateToIntTrasnformer.to(null)).toBeNull();
        expect(dateToIntTrasnformer.from(null)).toBeNull();
    });
});
